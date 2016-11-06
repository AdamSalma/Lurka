import React, { Component } from "react";

import classNames from 'classnames';
import Velocity from 'velocity-animate';
import TimeAgo from 'react-timeago';
import uuid from "uuid";

import ThreadPost from '../ThreadPost';
import Background from '../Background';
import Spinner from '../Spinner';

import '../../vendor';

// Helpers - delegate events from post to thread
import delegateMediaFullscreen from './makeFullscreen'
import delegatePostScroll from './scrollToPost'

export default class Thread extends Component {
    constructor(props) {
        super(props)
        this.openThread = this.openThread.bind(this)
        this.closeThread = this.closeThread.bind(this)
    }

    componentDidMount() {
        const {thread, threadWrap} = this.refs;
        delegateMediaFullscreen(thread)
        delegatePostScroll(thread)
        // $(threadWrap).nanoScroller({ sliderMinHeight: 40, alwaysVisible: true })
    }

    componentDidUpdate({ thread: oldthread } ) {
        const { thread } = this.props;
        // if (oldthread.posts.length !== thread.posts.length) {
        //     // Thread created or destroyed
        //     this.threadToggle();
        // }

        if (!oldthread.posts.length && thread.posts.length) {
            // New thread
            this.openThread()
            $(this.refs.thread).nanoScroller({ scroll: "top" })
        }

    }

    shouldComponentUpdate({ thread: newthread }) {
        return this.props.thread.posts.length != newthread.posts.length
    }

    render() {
        const { thread, isFetching } = this.props, { posts } = thread;

        const threadWrapClasses = classNames('thread-wrap', 'nano', {
            "thread-wrap-active": posts.length || isFetching
        });
        // const threadIsVisible = classNames({
        //     "hidden": posts.length || isFetching
        // })

        if (posts.length) {
            console.info(`Rendering Thread with ${posts.length} posts`);
        }

        return (
            <div>
                <Background 
                    isVisible={posts.length || isFetching} 
                    closeBackground={this.closeThread}/>
                <div ref='threadWrap' className={threadWrapClasses}>
                    <div className="thread nano-content" ref="thread">
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
        Velocity(thread, {top: "0"}, {
            duration: 850,
            easing: [0.25, 0.8, 0.25, 1],
            complete: () => {
                $(threadWrap).nanoScroller()
            }
        });
    }

    closeThread() {
        const { thread } = this.refs, { closeThread } = this.props;
        
        Velocity( thread, {top: window.innerHeight + "px"}, {
            duration: 100,
            complete: closeThread
        })
    }
}