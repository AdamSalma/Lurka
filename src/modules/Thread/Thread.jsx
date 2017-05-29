import './Thread.styles'
import React, { Component } from "react";
import cx from 'classnames';
import uuid from "uuid";

import ThreadPost from './ThreadPost';

import {
    Spinner,
    TimeAgo
} from '~/components';
import {Overlay} from './components';

import setupDOMEvents from './events';
import {
    onDrawerToggle,
    onThreadOpen,
    onThreadClose
} from '~/events/subscribers';
import {
    emitSubHeaderToggle
} from '~/events/publishers';

import {bindMembersToClass, setHTML} from '~/utils/react'
import {isFunction} from '~/utils/types'
import {throttleByCount} from '~/utils/throttle';

const {headerHeight} = window.appSettings;


class Thread extends Component {
    constructor(props) {
        super(props);

        bindMembersToClass(this,
            'openThread',
            'closeThread',
            'handleScroll'
        );

        this.state = {
            isDrawerOpen: props.isDrawerOpen || false,
            isOpen: props.isThreadOpen || false,
            isOpening: false,
            isClosing: false,
        }

        this.previousScrollTop = 0;

        this.onScroll = throttleByCount(8, this.handleScroll);

        this.animateInStyles = {
            translateY: [headerHeight, "100vh"],
            translateZ: 0, // Force hardware acceleration by animating a 3D property
        }

        this.animateInOpts = {
            duration: 800,  // this too
            easing: [0.165, 0.84, 0.44, 1],
            queue: false,
        }

        this.animateOutStyles = {
            translateY: [window.innerHeight, headerHeight],
            translateZ: 0, // Force hardware acceleration by animating a 3D property
        }

        this.animateOutOpts = {
            duration: 200,
            easing: [0.25, 0.8, 0.25, 1],
            queue: false,
        }
    }

    @onDrawerToggle
    onDrawerToggle(isDrawerOpen) {
        this.setState({isDrawerOpen});
    }

    @onThreadOpen
    onThreadOpen() {
        this.openThread();
    }

    @onThreadClose
    onThreadClose() {
        this.closeThread();

    }

    componentDidMount() {
        console.log("Thread mounted");
        setupDOMEvents(this._thread)

        // Creates the initial scroller
        this.updateScroller({
            sliderMinHeight: 40,
            alwaysVisible: true
        });
    }

    // shouldComponentUpdate({thread}, nextState) {
    //     return thread.isThreadOpen !== this.props.thread.isThreadOpen ||
    //            this.props.thread.posts.length !== thread.posts.length
    // }

    componentWillUnmount() {
        console.log("Thread will unmount");
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.isFetching && this.props.isFetching) {
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

        console.warn("posts:",posts.length)
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
                console.error("Terminated early")
                break
            }

            _posts.push(
                <ThreadPost
                    key={posts[i].id}
                    post={posts[i]}>
                    <TimeAgo date={posts[i].time}/>
                </ThreadPost>
            )
        }

        return _posts || null
    }

    openThread(callback) {
        this._overlay.show();
        // Must have separate invocations
        this.updateScroller({ scroll: "top" });
        this.updateScroller({ stop: true });
        this.setState({ isOpening: true });
        emitSubHeaderToggle(true, {
            delay: 200
        });

        const animationOpts = Object.assign({}, this.animateInOpts, {
            complete: () => {
                this.updateScroller();
                this.updateScroller({ scroll: "top" });
                this.setState({
                    isOpen: true,
                    isOpening: false
                });
                isFunction(callback) && callback();
            }
        });

        // TODO: Change from global appSettings into redux settingrs
        this.animateThread(this.animateInStyles, animationOpts);
    }

    closeThread(callback) {
        // Close scroller otherwise thread slides down while it remains
        this._overlay.hide();

        // Always close subeheader on thread exit
        emitSubHeaderToggle(false);

        console.info('Thread close start');
        console.warn(this.state);

        this.updateScroller({ stop: true });
        const animateOutOpts = Object.assign({}, this.animateOutOpts, {
            complete: () => {
                this.setState({isOpen: false});
                this.isClosed = true;
                this.props.cacheCurrentThread();
                console.info('Thread closed');
                this.props.destroyThread();
                isFunction(callback) && callback();
                console.info('Setstate isClosing: false');
            }
        });

        this.animateThread(this.animateOutStyles, animateOutOpts);
    }

    handleScroll(e) {
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

export default Thread
