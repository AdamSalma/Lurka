import React, { Component } from "react";
import cx from 'classnames';
import uuid from "uuid";
import connect from './connect';

import Api from 'config/api.4chan';

/* Components */
import {
    SquareSpinner,
    TimeAgo,
    Icon
} from '~/components';
import {
    Overlay,
    ThreadHeader,
    ControllerButton as CButton
} from './components';
import {
    ThreadPost as Post,
    ThreadControls as Controls
} from './containers';


/* Events */
import ThreadEvents from './events/setup';
import { emitSubHeaderToggle } from '~/events/publishers';
import {
    onSettingsToggle,
    onThreadOpen,
    onThreadClose
} from '~/events/subscribers';

/* Utilities */
import utils from '~/utils';
import {throttleByCount} from '~/utils/throttle';

/* Animation settings */
import {
    animationOptions,
    animationStyles,
    scrollConfig
} from './config'

import './styles'

const { headerHeight, threadWidth, icons: i } = window.appSettings;

class ThreadMediaRegistery {
    constructor(context) {
        this.expandedMedia = {}
        this.thread = context
        this.events = ThreadEvents(context)
    }

    getPostById( id ) {
        return this.thread.querySelector('#p' + id)
    }

    isExpanded = ( id ) => this.expandedMedia[id] || false

    addWebmScrollListener( post, callback ) {
        const video = post.querySelector('video')
        const onScroll = utils.throttle.throttleByCount(7,
            () => {
                console.log("webmScrollHandler", video.getBoundingClientRect())
                if (!utils.dom.isElementPartiallyInViewport(video)) {
                    console.error("PAUSING VIDEO !!!");
                    console.error("PAUSING VIDEO !!!");
                    console.error("PAUSING VIDEO !!!");
                    video.pause();
                    this.thread.removeEventListener("scroll", onScroll, false);
                }
            }
        )

        this.thread.addEventListener("scroll", onScroll, false)
        console.log("Added webm scroll event listener");
    }

    /**
     * Scroll media into view if necessary and setup Webm pausing when user
     * scrolls webm out of viewport for increased performance
     */
    onMediaToggle = ({ media, id }) => {
        console.log(arguments)
        console.groupCollapsed('%cMediaToggled', 'color: skyblue; background: #212121');
        let shouldScroll = true;
        const isExpanded = this.isExpanded(id);
        const post = this.getPostById(id);
        // Initialise options with default values (assumes closing):
        const scrollOpts = {
            highlightPost: scrollConfig.highlightPost,
            offset: scrollConfig.postOffset,
            scrollDuration: scrollConfig.closeDuration,
        }

        console.log(`Media is ${isExpanded ? 'closing' : 'opening'}. (id: ${id})`);
        console.log("Expanded media by post:", this.expandedMediaByPostId);

        if (isExpanded) {
            const { top } = post.getBoundingClientRect();

            console.log("Media top", top);
            console.log("Is media below header?", top > 14);

            if (top > scrollConfig.headerOffset) {
                // dont scroll down if the user has scrolled back up
                console.log("Media below header: not scrolling");
                shouldScroll = false
            }

        } else {
            // Prepare to oepn media
            const threadHeight = window.innerHeight - headerHeight
            let renderHeight = media.width > threadWidth
                ? media.height * (threadWidth / media.width)
                : media.height;

            console.log("Render height:", renderHeight);
            console.log("Original height:", media.height);
            console.log("Thread height:", threadHeight);

            let isLargeImage = renderHeight > threadHeight;

            scrollOpts.ease = scrollConfig.openEase
            scrollOpts.scrollDuration = scrollConfig.openDuration
            scrollOpts.offset = isLargeImage
                ? scrollConfig.imageOffset
                : scrollConfig.postOffset;

            if (media.filetype === ".webm") {
                console.info("Setting up webm scroll event");
                this.addWebmScrollListener(post);
            }
        }

        if (shouldScroll) {
            console.log("Scrolling to post using opts:", scrollOpts);
            this.events.scrollToPost($(post), scrollOpts);
        }

        else {
            console.log("Media scroll rejected");
        }

        // Toggle media state
        this.expandedMedia[id] = !isExpanded;

        console.groupEnd();
    }
}

export class Thread extends Component {
    constructor(props) {
        super(props);

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

        this.onScroll = utils.throttle.throttleByCount(8,
            this.handleScroll
        );

        this.expandedMediaByPostId = {}

    }

    @onThreadOpen
    onThreadOpen(callback) {
        console.log("Event: onThreadOpen");
        // Ignore if already open or opening
        if (!this.state.isOpen && !this.state.isOpening) {
            this.openThread(callback);
        } else {
            utils.types.isFunction(callback) && callback()
        }
    }

    @onThreadClose
    onThreadClose(callback) {
        console.log("Event: onThreadClose");
        // Ignore if already closed
        if (this.state.isOpen) {
            this.closeThread(callback);
        } else {
            utils.types.isFunction(callback) && callback()
        }
    }

    componentDidMount() {
        console.log("Thread mounted");

        // Creates the initial scroller
        this.updateScroller(this.scrollerOpts);

        // Handle media registery
        this.mediaRegistery = new ThreadMediaRegistery(this._thread)
    }

    // shouldComponentUpdate({thread}, nextState) {
    //     return thread.isThreadOpen !== this.props.thread.isThreadOpen ||
    //            this.props.thread.posts.length !== thread.posts.length
    // }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.isFetching && !prevProps.isFetching) {
            this._overlay.show();
        }
    }

    render() {
        const { isFetching, didInvalidate, posts, className } = this.props;
        const { isOpen, isOpening, isClosing, isDrawerOpen } = this.state;

        console.info(`Thread updated: isOpen: ${isOpen}, isOpening: ${isOpening}, isClosing: ${isClosing}`);
        const threadWrapClasses = cx('wrapper', 'nano', {
            "center-left": isDrawerOpen,
            "make-visible": isOpening || isOpen && !isClosing,
            // "fadein-boxshadow": isOpen && !isClosing && !isOpening
        });

        if (didInvalidate)
            return null

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
                {this.renderControls()}
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

    renderControls() {
        return <Controls startVisible={this.state.isOpen}
            ref={ref => this._controls = ref}
            leftSide={[
                <CButton key="cinema"
                    onActivate={() => { console.log("cinema click", this.props); this.props.toggleCinema()}}
                    onDeactivate={this.props.toggleCinema}
                >
                    <Icon name={i.threadControlsCinema}/>
                </CButton>,
                this.renderWatchController()
            ]}

            rightSide={[
                <CButton key="comment">
                    <Icon name={i.navbarNewThread}/>
                </CButton>,
                <CButton key="update">
                    <Icon name={i.navbarRefresh}/>
                </CButton>
            ]}
        />
    }

    renderWatchController() {
        const {boardID, threadID, lastModified, posts} = this.props;
        const hasPosts = posts && posts.length

        const entity = {
            id: `${boardID}/${threadID}`,
            url: Api.thread(boardID, threadID),
            lastModified: lastModified,
            postsCount: hasPosts ? posts.length : 0,
            op: hasPosts ? posts[0] : {},
            lastReplyAt: hasPosts ? posts[posts.length - 1].time : null
        }

        return <CButton key="watch"
            isActive={this.props.isBeingWatched}
            onActivate={() => this.props.addWatchEntity(entity)}
            onDeactivate={() => this.props.removeWatchEntity(entity)}
        >
            <Icon name={i.threadControlsClock}/>
        </CButton>
    }

    renderPosts(posts) {
        if (!posts || !posts.length) {
            console.warn("Could not render posts. Received:", posts);
            return null
        }

        const {isOpen, isClosing} = this.state;
        const quickRender = !isOpen && !isClosing
        const _posts = []
        var post;

        for (var i = 0; i < posts.length; i++) {
            if (quickRender && i >= 8) {
                // Animation performance bonus
                console.warn("Quick render");
                break
            }
            console.log('Thread render in progress');
            post = posts[i];

            _posts.push(
                <Post key={post.id} post={post} onMediaToggle={
                    this.mediaRegistery.onMediaToggle.bind(null, post)
                }/>
            )
        }

        return _posts || null
    }

    openThread = (callback) => {
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
            complete: this.threadDidOpen.bind(null, callback)
        });

        this.animateThread(animationStyles.in, animationOpts);
    }

    threadDidOpen = (callback) => {
        logger.method('threadDidOpen');
        this.updateScroller({ scroll: "top", stop: false });
        this._controls.show();
        this.setState({
            isOpen: true,
            isOpening: false
        }, this.updateScroller);
        utils.types.isFunction(callback) && callback();
    }

    closeThread = (callback) => {
        logger.method('closeThread');
        this._controls.hide();
        this._overlay.hide();

        // Always close subeheader on thread exit
        emitSubHeaderToggle(false);

        // Close scroller otherwise thread slides down while it remains
        this.updateScroller({ stop: true });

        const animationOpts = Object.assign({}, animationOptions.out, {
            complete: this.threadDidClose.bind(null, callback)
        });

        this.animateThread(animationStyles.out, animationOpts);
    }

    threadDidClose = (callback, element) => {
        this.updateScroller({ scroll: "top" });
        logger.method("threadDidClose")
        this.setState({ isOpen: false });
        this.isClosed = true;
        this.props.cacheCurrentThread();
        this.props.destroyThread();
        utils.types.isFunction(callback) && callback(element);
        // is second invocation, fixes bug when thread open/closed quickly
        this._controls.hide();
    }

    handleScroll = (e) => {
        e.stopPropagation();

        console.log("Thread::previousScrollTop:", this.previousScrollTop)
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

export default connect(Thread);
