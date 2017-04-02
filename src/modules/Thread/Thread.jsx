import './Thread.styles'
import React, { Component } from "react";

import classes from 'classnames';
import Velocity from 'velocity-animate';
import uuid from "uuid";

import ThreadPost from '../ThreadPost';

import {
    Overlay,
    Spinner,
    TimeAgo
} from '../../components';

import {
    setupQuoteEvents, 
    enableFullscreen
} from './events'


export default class Thread extends Component {
    constructor(props) {
        super(props)
        this.openThread = this.openThread.bind(this)
        this.closeThread = this.closeThread.bind(this)
    }

    componentDidMount() {
        console.log("Thread mounted");
        enableFullscreen(this._thread)
        setupQuoteEvents(this._thread)
        this._threadWrap && this._threadWrap.nanoScroller({ 
            sliderMinHeight: 40, 
            alwaysVisible: true 
        })
    }

    componentDidUpdate({ thread: oldthread } ) {
        const { thread } = this.props;

        if (!oldthread.posts.length && thread.posts.length) {
            // New thread
            this.openThread()
        }

    }

    shouldComponentUpdate({thread}, nextState) {
        return thread.isActive !== this.props.thread.isActive || 
               this.props.thread.posts.length !== thread.posts.length
    }

    componentWillUnmount() {
        console.log("Thread will unmount");
    }

    render() {
        const { isActive, thread:{ posts, didInvalidate }} = this.props
        const threadWrapClasses = 
            classes('thread-wrap', 'nano', {
                "thread-wrap-active": isActive
            });

        const threadClasses = 
            classes('thread', 'nano-content', {
                "thread-active": isActive
            });

        if (didInvalidate) 
            return null

        return (
            <div ref={t => this._threadWrap = $(t)} className={threadWrapClasses}>
                <div id="thread" className={threadClasses} ref={t => this._thread = $(t)} onClick={this.closeThread}>
                    <div className="header-gap" />
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
        
        this._thread.velocity({top: 0}, {
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
