import './Thread.styles'
import React, { Component } from "react";
import cx from 'classnames';
import uuid from "uuid";

import ThreadPost from './ThreadPost';

import {
    Overlay,
    Spinner,
    TimeAgo
} from '~/components';

import setupDOMEvents from './events';
import {
    onDrawerToggle,
    onThreadOpen,
    onThreadClose
} from '~/events/subscribers';
import {
    emitSubHeaderToggle
} from '~/events/publishers';

import {bindMembersToClass} from '~/utils/react'
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

        this.previousScrollTop = 0
        this.onScroll = throttleByCount(5, this.handleScroll)

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
        if (!prevProps.isOpen && this.state.isOpen) {
            this.updateScroller();
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
                    ref={ ref => this._overlay = ref}
                    isVisible={!didInvalidate && (isFetching || isOpening || isOpen)}>
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
                        <div className="subheader-gap"></div>
                        {this.renderTitle(posts)}
                        {this.renderPosts(posts)}
                    </div>
                </div>
            </div>
        )
    }

    renderTitle(posts) {
        return posts && posts.length && posts[0] && posts[0].title ?
            <div className="Thread__title">
                {posts[0].title}
            </div> : null
    }

    renderPosts(posts) {
        const {isOpen, isClosing} = this.state;
        const quickRender = !isOpen && !isClosing

        if (posts.length) {
            return posts.map((post, index) => {
                if (quickRender && index >= 8) {
                    console.error("Terminated early")
                    return null
                }

                return <ThreadPost
                    key={post.id}
                    post={post}>
                    <TimeAgo date={post.time}/>
                </ThreadPost>
            })
        }
    }

    openThread(callback) {
        this._overlay.show();
        this.setState({ isOpening: true });
        // Must have separate invocations
        this.updateScroller({ scroll: "top" });
        this.updateScroller({ stop: true });
        emitSubHeaderToggle(true, {
            delay: 100
        });

        // TODO: Change from global appSettings into redux settingrs
        this.animateThread({
            translateY: [headerHeight, "100vh"],
            translateZ: 0, // Force hardware acceleration by animating a 3D property
        }, {
            duration: 600,  // this too
            easing: [0.165, 0.84, 0.44, 1],
            queue: false,
            complete: () => {
                this.setState({
                    isOpen: true,
                    isOpening: false
                }, this.updateScroller);
                isFunction(callback) && callback();
            }
        });
    }

    closeThread(callback) {
        // Close scroller otherwise thread slides down while it remains
        this._overlay.hide();

        // Always close subeheader on thread exit
        emitSubHeaderToggle(false);

        console.info('Thread close start');
        console.warn(this.state);

        this.updateScroller({ stop: true });
        this.animateThread({
            translateY: [window.innerHeight, headerHeight],
            translateZ: 0, // Force hardware acceleration by animating a 3D property
        }, {
            queue: false,
            duration: 200,
            easing: [0.25, 0.8, 0.25, 1],
            complete: () => {
                // TODO: get these from this.props:
                // dispatch(saveThreadToHistory(state))
                // dispatch(destroyThread(threadID))
                this.setState({isOpen: false})
                this.isClosed = true

                console.info('Thread closed')
                this.props.destroyThread();
                isFunction(callback) && callback();
                console.info('Setstate isClosing: false')
            }
        });

        // this.setState({ isOpen: false, isClosing: true }, () => {


        // });

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
