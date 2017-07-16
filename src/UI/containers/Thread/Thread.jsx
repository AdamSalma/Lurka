import './Thread.styles'
import React, { Component } from "react";
import cx from 'classnames';
import uuid from "uuid";

/* Components */
import {
    SquareSpinner,
    TimeAgo
} from '~/components';
import {
    Overlay,
    ThreadHeader
} from './components';
import {
    ThreadPost as Post,
    ThreadControls as Controls
} from './containers';


/* Events */
import setupEvents from './events/setup';
import { emitSubHeaderToggle } from '~/events/publishers';
import {
    onSettingsToggle,
    onThreadOpen,
    onThreadClose
} from '~/events/subscribers';

/* Utilities */
import {bindMembersToClass, setHTML} from '~/utils/react'
import {isFunction} from '~/utils/types'
import {throttleByCount} from '~/utils/throttle';

/* Animation settings */
import {
    animationOptions,
    animationStyles,
    scrollConfig
} from './config'

const { headerHeight } = window.appSettings;


class Thread extends Component {
    constructor(props) {
        super(props);

        bindMembersToClass(this,
            'openThread',
            'closeThread',
            'handleScroll',
            'onThreadClosed',
            'onThreadOpened',
            'onMediaToggle'
        );

        this.state = {
            isDrawerOpen: props.isDrawerOpen || false,
            isOpen: props.isThreadOpen || false,
            isOpening: false,
            isClosing: false
        }

        this.previousScrollTop = 0;

        this.scrollerOpts = {
            alwaysVisible: true,
            // scrollerMinHeight etc ...
        }

        this.onScroll = throttleByCount(8, this.handleScroll);

        this.expandedMediaByPostId = {}
    }

    @onThreadOpen
    onThreadOpen() {
        // Ignore if already open or opening
        !this.state.isOpen && !this.state.isOpening && this.openThread();
    }

    @onThreadClose
    onThreadClose() {
        // Ignore if already closed
        this.state.isOpen && this.openThread();
    }

    componentDidMount() {
        console.log("Thread mounted");
        this.events = setupEvents(this._thread)

        // Creates the initial scroller
        this.updateScroller(this.scrollerOpts);
    }

    // shouldComponentUpdate({thread}, nextState) {
    //     return thread.isThreadOpen !== this.props.thread.isThreadOpen ||
    //            this.props.thread.posts.length !== thread.posts.length
    // }

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.isFetching && this.props.isFetching) {
            this._overlay.show();
        }
    }

    render() {
        const { isFetching, didInvalidate, posts, className } = this.props;
        const { isOpen, isOpening, isClosing, isDrawerOpen } = this.state;

        logger.info(`Thread updated: isOpen: ${isOpen}, isOpening: ${isOpening}, isClosing: ${isClosing}`);
        const threadWrapClasses = cx('wrapper', 'nano', {
            "center-left": isDrawerOpen,
            "make-visible": isOpening || isOpen && !isClosing,
            // "fadein-boxshadow": isOpen && !isClosing && !isOpening
        });

        if (didInvalidate)
            return null

        logger.warn("posts:",posts.length)
        return (
            <div className={cx("Thread", className)}>
                <Overlay
                    onClick={this.closeThread}
                    ref={ ref => this._overlay = ref}>
                    <SquareSpinner
                        isSpinning={!posts.length && (isFetching || isOpening)}
                    />
                </Overlay>

                <div ref={ref => this._threadWrap = ref} className={threadWrapClasses}>
                    <div
                      className='content nano-content'
                      ref={ref => this._thread = ref}
                      onClick={this.closeThread}
                      onScroll={undefined/*this.onScroll*/}>
                        {this.renderHeader(posts)}
                        {this.renderPosts(posts)}
                    </div>
                </div>
                <Controls ref={ref => this._controls = ref} show={isOpen} hide={isClosing}/>
            </div>
        )
    }

    renderHeader(posts) {
        if (posts && posts.length && posts[0]) {
            posts.length
            return <ThreadHeader
                      OP={posts[0]}
                      lastUpdated={posts[posts.length-1].time}
                    />
        }
    }

    renderPosts(posts) {
        if (!posts || !posts.length) {
            return null
        }

        const {isOpen, isClosing} = this.state;
        const quickRender = !isOpen && !isClosing
        const _posts = []
        var post;

        for (var i = 0; i < posts.length; i++) {
            if (quickRender && i >= 8) {
                // Animation performance bonus
                logger.warn("Terminated early")
                break
            }

            logger.log('Thread render in progress')

            post = posts[i]

            _posts.push(
                <Post key={post.id} post={post}
                    onMediaToggle={
                        this.onMediaToggle
                            .bind(null, post.id, post.media)
                    }
                />
            )
        }

        return _posts || null
    }

    openThread(callback) {
        logger.method('openThread');
        this._overlay.show();

        // Must have separate invocations
        this.updateScroller({ scroll: "top" });
        this.updateScroller({ stop: true });

        this.setState({ isOpening: true });
        // emitSubHeaderToggle(true, {
            // delay: 200
        // });

        const animationOpts = Object.assign({}, animationOptions.in, {
            complete: this.onThreadOpened.bind(null, callback)
        });

        this.animateThread(animationStyles.in, animationOpts);
    }

    onThreadOpened(callback) {
        logger.method('onThreadOpened');
        this.updateScroller({ scroll: "top", stop: false });
        this._controls.show();
        this.setState({
            isOpen: true,
            isOpening: false
        }, this.updateScroller);
        isFunction(callback) && callback();
    }

    closeThread(callback) {
        logger.method('closeThread');
        this._controls.hide();
        this._overlay.hide();

        // Always close subeheader on thread exit
        emitSubHeaderToggle(false);

        // Close scroller otherwise thread slides down while it remains
        this.updateScroller({ stop: true });

        const animationOpts = Object.assign({}, animationOptions.out, {
            complete: this.onThreadClosed.bind(null, callback)
        });

        this.animateThread(animationStyles.out, animationOpts);
    }

    onThreadClosed(callback, element) {
        this.updateScroller({ scroll: "top" });
        logger.method("onThreadClosed")
        this.setState({ isOpen: false });
        this.isClosed = true;
        this.props.cacheCurrentThread();
        this.props.destroyThread();
        isFunction(callback) && callback(element);
        // is second invocation, fixes bug when thread open/closed quickly
        this._controls.hide();
    }

    handleScroll(e) {
        e.stopPropagation();

        logger.log("Thread::previousScrollTop:", this.previousScrollTop)
        // Condition overrides toggle
        emitSubHeaderToggle(e.target.scrollTop < this.previousScrollTop);

        this.previousScrollTop = e.target.scrollTop;
    }

    updateScroller(args) {
        this._threadWrap && $(this._threadWrap).nanoScroller(args);
    }

    animateThread(styles, options) {
        this._thread && $(this._thread).velocity(styles, options);
    }

    onMediaToggle(postId, media) {
        console.groupCollapsed('%cMediaToggled', 'color: skyblue; background: #212121')
        let willClose = this.expandedMediaByPostId[postId] || false;
        let post = this._thread.querySelector('#p' + postId)

        // Initialise options with default values (assume closing):
        let options = {
            highlightPost: scrollConfig.highlightPost,
            offset: scrollConfig.postOffset,
            scrollDuration: scrollConfig.closeDuration,
        }

        let shouldScroll = true

        console.log(`Media is ${willClose ? 'closing' : 'opening'}. (postId: ${postId})`);
        console.log("Expanded media by post:", this.expandedMediaByPostId);

        if (willClose) {
            let { top } = post.getBoundingClientRect();

            console.log("Media top", top);
            console.log("Is media below header?", top > 14);
            if (top > scrollConfig.headerOffset) {
                // dont scroll down if the user has scrolled back up
                console.log("Media below header: not scrolling");
                shouldScroll = false
            }
        } else {
            // Media will open

            let threadHeight = window.innerHeight - headerHeight
            let isWebmOrSizeLessThanWindowButBiggerThanHalf =
                    media.filetype === ".webm" ||
                    media.height < threadHeight
                    && media.height > threadHeight/2

            let renderHeight = media.width > 1024 ? media.height * (1024 / media.width) : media.height;

            console.log("Render height:", renderHeight);
            console.log("Original height:", media.height);
            console.log("Thread height:", threadHeight);

            let isLargeImage = renderHeight > threadHeight;

            options.ease = scrollConfig.openEase
            options.scrollDuration = scrollConfig.openDuration
            options.offset = isLargeImage
                ? scrollConfig.imageOffset
                : scrollConfig.postOffset;
        }

        if (shouldScroll) {
            console.log("Scrolling with options:", options)
            this.events.scrollToPost($(post), options);
        } else {
            console.log("Scroll rejected");
        }

        // Keep reference of media state
        this.expandedMediaByPostId[postId] = !willClose;

        console.groupEnd();
    }
}

export default Thread;
