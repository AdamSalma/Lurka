import React, { Component } from "react";

import classNames from 'classnames';
import Velocity from 'velocity-animate';
import uuid from "uuid";

import TimeAgo from '../TimeAgo';
import ThreadPost from '../ThreadPost';
import Background from '../Background';
import Spinner from '../Spinner';

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
        enableFullscreen(this._thread)
        setupQuoteEvents(this._thread)
        this._threadWrap.nanoScroller({ sliderMinHeight: 40, alwaysVisible: true })
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
        const { posts, didInvalidate } = thread;

        const threadWrapClasses = classNames('thread-wrap', 'nano', {
            "thread-wrap-active": isActive
        });

        if (didInvalidate) 
            return false

        console.log(`THREAD: posts: ${posts.length}, isFetching: ${isFetching}`)

        return (
            <div>
                <Background 
                    isVisible={isActive} 
                    closeBackground={this.closeThread}/>
                <Spinner isSpinning={isActive && !posts.length}/>
                <div ref={t => this._threadWrap = $(t)} className={threadWrapClasses}>
                    <div id="thread" className="thread nano-content" ref={t => this._thread = $(t)}>
                        {this.createPosts( posts )}
                    </div>
                </div>
            </div>
        )
    }
    // <div className="header-gap"></div>

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
        closeThread(threadID)
        scrollHeader(true)
    }
}
