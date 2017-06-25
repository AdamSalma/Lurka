import './Thread.styles'
import React, { Component } from "react";
import cx from 'classnames';
import uuid from "uuid";

/* Components */
import {
    Spinner,
    TimeAgo
} from '~/components';
import { Overlay } from './components';
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
    animationStyles
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
            'onThreadOpened'
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
        logger.log("Thread mounted");
        setupEvents(this._thread)

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
                    <Spinner
                        isSpinning={!posts.length && (isFetching || isOpening)}
                    />
                </Overlay>

                <div ref={ref => this._threadWrap = ref} className={threadWrapClasses}>
                    <div
                        className='content nano-content'
                        ref={ref => this._thread = ref}
                        onClick={this.closeThread}
                        onScroll={this.onScroll}>
                        <div className="Thread__start-gap"></div>
                        {this.renderTitle(posts)}
                        {this.renderPosts(posts)}
                    </div>
                </div>
                <Controls ref={ref => this._controls = ref} show={isOpen} hide={isClosing}/>
            </div>
        )
    }

    renderTitle(posts) {
        return posts && posts.length && posts[0] && posts[0].title
            ? <div className="Thread__title" {...setHTML(posts[0].title)}/>
            : null
    }

    renderPosts(posts) {
        const {isOpen, isClosing} = this.state;
        const quickRender = !isOpen && !isClosing
        const _posts = []

        for (var i = 0; i < posts.length; i++) {
            if (quickRender && i >= 8) {
                logger.warn("Terminated early")
                break
            }

            _posts.push(
                <Post
                    key={posts[i].id}
                    post={posts[i]}>
                    <TimeAgo date={posts[i].time}/>
                </Post>
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
        emitSubHeaderToggle(true, {
            delay: 200
        });

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

    onThreadClosed(callback) {
        this.updateScroller({ scroll: "top" });
        logger.method("onThreadClosed")
        this.setState({ isOpen: false });
        this.isClosed = true;
        this.props.cacheCurrentThread();
        this.props.destroyThread();
        isFunction(callback) && callback();
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
}

export default Thread;
