import React, { Component } from "react";
import cx from 'classnames';
import uuid from "uuid";
import connect from './connect';

import Api from 'config/api.4chan';

/* Components */
import {
    SquareSpinner,
    TimeAgo,
    Icon,
    Scrollable
} from '~/components/UI';
import {
    Overlay,
    ThreadHeader,
    ControllerButton as CButton
} from './components';
import {
    ThreadControls as Controls,
    ThreadPosts
} from './containers';


/* Events */
import setupThreadEvents from './events/setup';
import MediaRegistry from './events/mediaRegistry';
import {
    onSettingsToggle,
    emitSubHeaderToggle,
    onThreadOpen,
    onThreadClose,
    onThreadMove,
    emitPostToggle
} from '~/events';

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


const i = Lurka.icons;


export class Thread extends Component {
    constructor(props) {
        super(props);

        // Prefer viewState over state to avoid re-rendering.
        this.viewState = {
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

        // For toggling thread/post when clicking on overlay
        this.isPostOpen = false
    }

    @onThreadOpen
    onThreadOpen(callback) {
        console.log("Event: onThreadOpen");
        // Ignore if already open or opening
        if (this.viewState.isOpen || this.viewState.isOpening) {
            return utils.types.isFunction(callback) && callback()
        }

        // Only open when is in a closed state
        this.setupThreadEvents();
        this.openThread(callback);
    }

    @onThreadClose
    onThreadClose(callback) {
        console.log("Event: onThreadClose", arguments);
        if (!this.viewState.isOpen) {
            // Ignore if closed
            return utils.types.isFunction(callback) && callback()
        }

        // Close only when open
        this.teardownThreadEvents();
        this.closeThread(callback);
    }

    @onThreadMove
    onThreadMove({ position, duration=400, easing=[0.23, 1, 0.32, 1], callback }) {
        if (process.env.NODE_ENV !== "production") {
            if (!position) {
                throw new Error("onThreadMove: No position supplied")
            }
        }

        if (this.isMovingThread) {
            console.warn("onThreadMove rejected; is moving")
            return
        }

        this.isMovingThread = true

        if (position === "right") {
            this._controls.hide()
            this.isPostOpen = true
            this.animateWrapper({ translateX: "25%" }, {
                duration, easing,
                complete: () => this.handleThreadMove(callback)
            })
        } else {
            this._controls.show()
            this.isPostOpen = false
            // revert to center
            this.animateWrapper({ translateX: 0 }, {
                duration, easing,
                complete: () => this.handleThreadMove(callback)
            })
        }
    }

    handleThreadMove(callback) {
        console.log("handleThreadMove")
        this.isMovingThread = false
        utils.types.isFunction(callback) && callback()
    }

    componentDidMount() {
        console.log("Thread mounted");
    }

    setupThreadEvents = () => {
        const threadReference = this.scrollComponent._scroller;

        this.events = setupThreadEvents(threadReference);

        // Handle media registry
        this.mediaRegistery = new MediaRegistry(threadReference, this.events.scrollToPost, scrollConfig)

        // Creates the initial scroller
        this.updateScroller(this.scrollerOpts);
    }

    teardownThreadEvents = () => {
        this.events && this.events.teardownThreadEvents();
        this.mediaRegistery = null;
        this.events = null;
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
        const { isOpen, isOpening, isClosing, isDrawerOpen } = this.viewState;

        console.info(`Thread updated: isOpen: ${isOpen}, isOpening: ${isOpening}, isClosing: ${isClosing}`);
        const threadContainerClasses = cx('wrapper', 'nano', {
            "center-left": isDrawerOpen,
            "make-visible": isOpening || isOpen && !isClosing,
            // "fadein-boxshadow": isOpen && !isClosing && !isOpening
        });

        if (didInvalidate) {
            // TODO: Expand on this. Keep overlay, add error message, close
            // thread after 5s timeout
            return null
        }

        const ThreadControlsComponent = this.renderControls();

        return (
            <div className={cx("Thread", className)}>
                <Overlay
                    onClick={this.handleOverlayClick}
                    ref={ ref => this._overlay = ref}>
                    <SquareSpinner
                        isSpinning={!posts.length && (isFetching || isOpening)}
                    />
                </Overlay>

                <Scrollable translate3d
                    className="content"
                    containerProps={{className:threadContainerClasses}}
                    ref={ref => this.scrollComponent = ref}
                >
                    {this.renderHeader(posts)}
                    <ThreadPosts posts={posts}
                        // "quickRender" is used to increase animation performance by
                        // rendering just a few posts initially so that the DOM load
                        // isn't too heavy when opening the Thread via an animation
                        quickRender={isOpening || !isOpen && !isClosing}
                        mediaRegistery={this.mediaRegistery}
                        ref={ref => this._postsRef = ref}
                    />
                </Scrollable>
                {ThreadControlsComponent}
            </div>
        )
    }

    handleOverlayClick = () => {
        if (this.isPostOpen) {
            // Close post if it's open
            emitPostToggle({ override: false })
        } else {
            // Otherwise close the thread
           this.closeThread()
        }

        // This is a safeguard against accidental clicks outside of the post
        // box without closing the thread
    }

    renderHeader(posts) {
        if (posts && posts.length && posts[0]) {
            return (
                <ThreadHeader
                  OP={posts[0]}
                  lastUpdated={posts[posts.length-1].time}
                />
            );
        }
    }

    renderControls() {
        return <Controls startVisible={this.viewState.isOpen}
            ref={ref => this._controls = ref}
            leftSide={[
                <CButton key="cinema"
                    onActivate={this.props.toggleCinema}
                    onDeactivate={this.props.toggleCinema}
                >
                    <Icon name={i.threadControlsCinema}/>
                </CButton>,
                this.renderWatchController()
            ]}

            rightSide={[
                <CButton key="post"
                    onActivate={this.togglePost}
                    onDeactivate={this.togglePost}
                >
                    <Icon name={i.navbarNewThread}/>
                </CButton>,
                <CButton key="update">
                    <Icon name={i.navbarRefresh}/>
                </CButton>
            ]}
        />
    }

    togglePost() {
        return emitPostToggle({
            context: "thread"
        })
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

        const {isOpen, isClosing} = this.viewState;
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
                    this.mediaRegistery && this.mediaRegistery.onMediaToggle.bind(null, post)
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
        this.setViewState({ isOpening: true })

        // emitSubHeaderToggle(true, {
            // delay: 200
        // });

        this.animateThread(animationStyles.in, {
            ...animationOptions.in,
            complete: () => this.threadDidOpen(callback)
        })
    }

    threadDidOpen = (callback) => {
        logger.method('threadDidOpen');
        this.updateScroller({ scroll: "top", stop: false });
        this._controls.show();
        this.setViewState({
            isOpen: true,
            isOpening: false
        });
        this.updateScroller({ scroll: "top" })

        // Render all posts - only ~ 8 posts are rendered initially for the
        // animation slide in. This makes the rest of the posts be rendered too.
        this.forceUpdate()
        // this._postsRef.renderAllPosts()

        utils.types.isFunction(callback) && callback();
    }

    closeThread = (callback) => {
        console.log("closeThread:", arguments)
        // logger.method('closeThread');
        this._controls.hide();
        this._overlay.hide();

        // Close scroller otherwise thread slides down while it remains
        this.updateScroller({ stop: true });

        // Always close subeheader on thread exit
        // emitSubHeaderToggle(false);

        this.animateThread(animationStyles.out, {
            ...animationOptions.out,
            complete: () => this.threadDidClose(callback)
        });
    }

    threadDidClose = (callback, element) => {
        console.log("threadDidClose", arguments)
        this.updateScroller({ scroll: "top" });
        logger.method("threadDidClose")
        this.setViewState({ isOpen: false });
        this.isClosed = true;
        this.props.cacheCurrentThread();
        this.props.destroyThread();
        utils.types.isFunction(callback) && callback(element);
        // is second invocation, fixes bug when thread open/closed quickly
        this._controls.hide();
        console.log(this)
        this.teardownThreadEvents();

    }

    handleScroll = (e) => {
        e.stopPropagation();

        console.log("Thread::previousScrollTop:", this.previousScrollTop)
        // Condition overrides toggle
        emitSubHeaderToggle(e.target.scrollTop < this.previousScrollTop);

        this.previousScrollTop = e.target.scrollTop;
    }

    updateScroller(args) {
        this.scrollComponent && this.scrollComponent.updateScroller(args);
    }

    setViewState(nextViewState) {
        this.viewState = Object.assign({}, this.viewState, nextViewState);
        this.updateViewFromState()
    }

    updateViewFromState(){
        if (!this.scrollComponent || !this.scrollComponent._container)
            return;

        const view = this.scrollComponent._container;
        const {isOpen, isOpening, isClosing, isClosed} = this.viewState;

        console.warn(view);
        console.warn(view);
        console.warn(view);

        if (isOpening || isOpen && !isClosing) {
            view.classList.add('make-visible');
        } else {
            view.classList.remove('make-visible');
        }
    }

    animateWrapper(styles, options) {
        this.scrollComponent && this.scrollComponent._container &&
            $(this.scrollComponent._container).velocity(styles, options);
    }

    animateThread(styles, options) {
        this.scrollComponent && this.scrollComponent._scroller &&
            $(this.scrollComponent._scroller).velocity(styles, options);
    }
}

export default connect(Thread);
