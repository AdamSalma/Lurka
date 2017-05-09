import './Thread.styles'
import React, { Component } from "react";

import classes from 'classnames';
import uuid from "uuid";

import ThreadPost from './ThreadPost';

import {
    Overlay,
    Spinner,
    TimeAgo
} from '~/components';

import setupThreadEvents from './events'

import {
    bindMembersToClass
} from '~/utils'

import threadConnect from './ThreadHOC'

class Thread extends Component {
    constructor(props) {
        super(props);

        bindMembersToClass(this,
            'openThread',
            'closeThread'
        );

        this.state = {
            headerHeight: window.appSettings.headerHeight
        }
    }

    componentDidMount() {
        console.log("Thread mounted");
        setupThreadEvents(this._thread)
        this._threadWrap && this._threadWrap.nanoScroller({
            sliderMinHeight: 40,
            alwaysVisible: true
        })
    }

    componentDidUpdate({ posts } ) {
        if (!posts.length && this.props.posts.length) {
            this.openThread()
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
        const { isDrawerOpen, isCommentPanelOpen, isThreadOpen, didInvalidate, posts } = this.props
        const threadWrapClasses = classes('wrapper', 'nano', {
            "make-visible": isThreadOpen,
            "center-left": isDrawerOpen || isCommentPanelOpen,
            "double-center-left": isDrawerOpen && isCommentPanelOpen
        });

        const threadClasses = classes('content', 'nano-content', {
            "is-active": isThreadOpen
        });

        if (didInvalidate)
            return null

        return (
            <div ref={t => this._threadWrap = $(t)} className={threadWrapClasses}>
                {this.props.children}
                <div id="thread" className={threadClasses} ref={t => this._thread = $(t)} onClick={this.closeThread}>
                    {posts.length && this.createPosts( posts )}
                </div>
            </div>
        )
    }
    // <div className="header-gap"></div>

    createPosts( posts ) {
        return posts.map(
            post => <ThreadPost
                key={post.id}
                post={post}>
                <TimeAgo date={post.time}/>
            </ThreadPost>
        )
    }

    openThread() {
        // Must have separate invocations
        this._threadWrap.nanoScroller({ scroll: "top" })
        this._threadWrap.nanoScroller({ stop: true })

        this._thread.velocity({top: this.state.headerHeight}, {
            duration: 850,
            easing: [0.25, 0.8, 0.25, 1],
            complete: () => this._threadWrap.nanoScroller()
        });
    }

    closeThread() {
        const { closeThread, threadID, scrollHeader } = this.props;

        this._threadWrap.nanoScroller({ stop: true })
        closeThread()
        scrollHeader(true)
    }
}

export default threadConnect(Thread)
