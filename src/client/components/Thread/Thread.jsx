import React, { Component } from "react";

import classNames from 'classnames';
import Velocity from 'velocity-animate';
import TimeAgo from 'react-timeago';
import uuid from "uuid";

import ThreadPost from '../ThreadPost';
import Background from '../Background';

import {
    setupQuoteEvents, 
    enableFullscreen
} from './threadControls'


export default class Thread extends Component {
    constructor(props) {
        super(props)
        this.openThread = this.openThread.bind(this)
        this.closeThread = this.closeThread.bind(this)
    }

    componentDidMount() {
        const {thread, threadWrap} = this.refs;
        enableFullscreen(thread)
        setupQuoteEvents(thread)
        $(threadWrap).nanoScroller({ sliderMinHeight: 40, alwaysVisible: true })
    }

    componentDidUpdate({ thread: oldthread } ) {
        const { thread } = this.props;

        if (!oldthread.posts.length && thread.posts.length) {
            // New thread
            this.openThread()
        }

    }

    render() {
        const { thread, isFetching, isActive } = this.props
        const { posts } = thread;

        const threadWrapClasses = classNames('thread-wrap', 'nano', {
            "thread-wrap-active": isActive
        });

        console.log(`THREAD: posts: ${posts.length}, isFetching: ${isFetching}`)

        return (
            <div>
                <Background 
                    isVisible={isActive} 
                    closeBackground={this.closeThread}/>
                <div ref='threadWrap' className={threadWrapClasses}>
                    <div id="thread" className="thread nano-content" ref="thread">
                        {this.createPosts( posts )}
                    </div>
                </div>
            </div>
        )
    }

    createPosts( posts ) {
        return posts.map( 
            post => <ThreadPost 
                key={uuid.v4()} 
                post={post}>
                <TimeAgo date={post.time}/>
            </ThreadPost>
        )
    }

    openThread() {
        const { thread, threadWrap } = this.refs;
        const $threadWrap = $(threadWrap), $thread = $(thread)
        $threadWrap.nanoScroller({ scroll: "top" })
        $threadWrap.nanoScroller({ stop: true })
        
        $thread.velocity({top: 0}, {
            duration: 850,
            easing: [0.25, 0.8, 0.25, 1],
            complete: () => $threadWrap.nanoScroller()
        });
    }

    closeThread() {
        const { thread, threadWrap } = this.refs;
        const { closeThread, threadID } = this.props;

        $(threadWrap).nanoScroller({ stop: true })

        $(thread).velocity({top: window.innerHeight+"px"}, {
            duration: 100,
            complete: () => closeThread(threadID)
        })
    }
}