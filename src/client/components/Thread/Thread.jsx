import React, { Component } from "react";

import classNames from 'classnames';
import Velocity from 'velocity-animate';
import TimeAgo from 'react-timeago';
import uuid from "uuid";

import ThreadPost from '../ThreadPost';
import Background from '../Background';
import Spinner from '../Spinner';

import '../../vendor';

import {
    fullscreenImageDelegation
} from './helpers'

export default class Thread extends Component {
    constructor() {
        super()
        this.threadToggle = this.threadToggle.bind(this)
    }

    componentDidMount() {
        const {thread, threadWrap} = this.refs;
        fullscreenImageDelegation(thread)
        // $(threadWrap).nanoScroller({ sliderMinHeight: 40, alwaysVisible: true })
    }

    // componentWillUnmount() {
    //     $(this.refs.thread).off('click');
    // }

    componentDidUpdate(prevProps) {
        const { thread } = this.props;
        if (prevProps.thread.length !== thread.length){
            // Thread created or destroyed
            this.threadToggle();
        } 
    }

    render() {
        const { thread, isFetching } = this.props
        const threadWrapClasses = classNames('thread-wrap', 'nano', {
            "thread-wrap-active": thread.length || isFetching
        });

        if (thread.length) console.info(`Rendering Thread with ${thread.length} posts`);
        

        return (
            <div>
                <Background 
                    isVisible={thread.length || isFetching} 
                    closeBackground={this.threadToggle}/>
                <Spinner isSpinning={isFetching}/>

                <div ref='threadWrap' className={threadWrapClasses}>
                    <div className="thread nano-content" ref="thread">
                        {thread.map( 
                            post => <ThreadPost 
                                key={uuid.v4()} 
                                post={post}>
                                <TimeAgo date={post.time}/>
                            </ThreadPost>
                        )}
                    </div>
                </div>
            </div>
        )
    }

    threadToggle() {
        const { thread, threadWrap } = this.refs;
        if (thread.offsetTop > 0) {
            // Slide up...

            $(threadWrap).nanoScroller({ sliderMinHeight: 60, stop: true })
            
            return Velocity(thread, {top: "0"}, {
                duration: 850,
                easing: [0.25, 0.8, 0.25, 1],
                complete: () => {
                    $(threadWrap).nanoScroller({ stop: false })
                }
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