import React, { Component } from "react";

import classNames from 'classnames';
import Velocity from 'velocity-animate';
import TimeAgo from 'react-timeago';
import uuid from "uuid";

import ThreadPost from '../ThreadPost';
import Background from '../Background';
import Spinner from '../Spinner';

import {
    fullscreenImageDelegation
} from './helpers'

export default class Thread extends Component {
    constructor() {
        super()
        this.threadToggle = this.threadToggle.bind(this)
    }

    componentDidMount() {
        fullscreenImageDelegation(this.refs.thread)
    }

    componentWillUnmount() {
        $(this.refs.thread).off('click')
    }

    componentDidUpdate(prevProps) {
        const { thread } = this.props;
        if (prevProps.thread.length !== thread.length){
            // Thread created or destroyed
            this.threadToggle();            
        } 
    }

    render() {
        const { thread, isFetching } = this.props
        const threadWrapClasses = classNames({
            "thread-wrap": true,
            "thread-wrap-active": thread.length || isFetching
        });

        if (thread.length) console.info(`Rendering Thread with ${thread.length} posts`);
        

        return (
            <div className={threadWrapClasses}>
                <Background 
                    isVisible={thread.length || isFetching} 
                    closeBackground={this.threadToggle}/>
                <Spinner 
                    isSpinning={isFetching}/>
                <div 
                    className="thread"
                    ref="thread">
                    {thread.map( 
                        post => {
                            console.log(post.time);
                            return (
                                <ThreadPost 
                                    key={uuid.v4()} 
                                    post={post}>
                                    <TimeAgo date={post.time}/>
                                </ThreadPost>
                            )
                        }
                    )}
                </div>
            </div>
        )
    }

    threadToggle() {
        const { thread } = this.refs;
        console.log(thread.offsetTop)
        if (thread.offsetTop > 0) {
            // Slide up...
            return Velocity(thread, {top: "0"}, {
                duration: 850,
                easing: [0.25, 0.8, 0.25, 1]
            })
        }

        // Slide down...
        this.props.closeThread()
        // $('#thread').css('top', window.innerHeight + "px");
        Velocity(
            thread, 
            {top: window.innerHeight + "px"}, 
            {duration: 10}
        )
    }
}