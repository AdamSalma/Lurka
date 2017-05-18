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

import setupThreadEvents from './events';
import {
    onDrawerToggle,
    onThreadOpen, onThreadClose
} from '~/events/subscribers';
import {bindMembersToClass} from '~/utils/react'
import {isFunction} from '~/utils/types'

const settings = window.appSettings;

class Thread extends Component {
    constructor(props) {
        super(props);

        bindMembersToClass(this,
            'openThread',
            'closeThread'
        );

        this.state = {
            isDrawerOpen: props.isDrawerOpen,
            isOpen: props.isThreadOpen,
            isOpening: false,
            isClosing: false,
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
        setupThreadEvents(this._thread)

        // Creates the initial scroller
        this.updateScroller({
            sliderMinHeight: 40,
            alwaysVisible: true
        });
    }

    componentDidUpdate({ posts } ) {
        if (!posts.length && this.props.posts.length) {
            this.openThread();
        }
    }

    // shouldComponentUpdate({thread}, nextState) {
    //     return thread.isThreadOpen !== this.props.thread.isThreadOpen ||
    //            this.props.thread.posts.length !== thread.posts.length
    // }

    componentWillUnmount() {
        console.log("Thread will unmount");
    }

    render() {
        const { isFetching, didInvalidate, posts, className } = this.props;
        const { isOpen, isOpening, isClosing, isDrawerOpen } = this.state;

        console.info(`Thread updated: isOpen: ${isOpen}, isOpening: ${isOpening}, isClosing: ${isClosing}`);
        const threadWrapClasses = cx('wrapper', 'nano', {
            "center-left": isDrawerOpen,
            "make-visible": isOpening || isOpen,
            "fadein-boxshadow": isOpen && !isClosing && !isOpening
        });

        if (didInvalidate)
            return null

        console.warn("posts:",posts.length)
        return (
            <div className={cx("Thread", className)}>
                <Overlay onClick={this.closeThread} isVisible={!didInvalidate && (isFetching || isOpening || isOpen)}>
                    <Spinner isSpinning={!posts.length && (isFetching || isOpening)}/>
                </Overlay>

                <div ref={ref => this._threadWrap = ref} className={threadWrapClasses}>
                    <div id="thread" className='content nano-content' ref={ref => this._thread = ref} onClick={this.closeThread}>
                        {posts.length && posts.map(
                            post => <ThreadPost
                                key={post.id}
                                post={post}>
                                <TimeAgo date={post.time}/>
                            </ThreadPost>
                        )}
                    </div>
                </div>
            </div>
        )
    }
    // <div className="header-gap"></div>

    openThread(callback) {
        this.setState({ isOpening: true }, () => {


        // Must have separate invocations
        this.updateScroller({ scroll: "top" });
        this.updateScroller({ stop: true });

        // TODO: Change from global appSettings into redux settingrs
        this.animateThread({top: window.appSettings.headerHeight}, {
            duration: 850,  // this too
            easing: [0.25, 0.8, 0.25, 1],
            complete: () => {
                this.updateScroller();
                this.setState({
                    isOpen: true,
                    isOpening: false
                });
                isFunction(callback) && callback();
            }
        });
        });
    }

    closeThread(callback) {
        this.setState({
            isClosing: true
        })
        // Close scroller otherwise thread slides down while it remains
        this.updateScroller({ stop: true });

        // TODO: Is the header going to be animated in-out?
        // scrollHeader(true)

        this.animateThread({top: window.innerHeight+"px"}, {
            duration: 150,
            complete: () => {
                // TODO: get these from this.props:
                // dispatch(saveThreadToHistory(state))
                // dispatch(destroyThread(threadID))
                isFunction(callback) && callback();
                this.setState({
                    isOpen: false,
                    isClosing: false
                })
            }
        });
    }

    updateScroller(args) {
        this._threadWrap && $(this._threadWrap).nanoScroller(args);
    }

    animateThread(styles, options) {
        this._thread && $(this._thread).velocity(styles, options);
    }
}

export default Thread
