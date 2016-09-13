import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import Velocity from 'velocity-animate';
import screenfull from 'screenfull';
import TimeAgo from 'react-timeago';

import ThreadPost from '../ThreadPost';
import Background from '../Background';
import Spinner from '../Spinner';

import {closeThread} from "../../actions/thread.actions";

class Thread extends React.Component {
    constructor() {
        super()
        this.onThreadClose = this.onThreadClose.bind(this)
    }

    render() {
        const { thread, isFetching } = this.props
        const threadWrapClasses = classNames({
            "thread-wrap": true,
            "thread-wrap-active": thread.length || isFetching
        });

        console.info(`Rendering Thread with ${thread.length} posts`);
        
        if (thread) this.slideThreadUp();

        return (
            <div className={threadWrapClasses}>
                <Background 
                    isVisible={thread.length || isFetching} 
                    closeBackground={this.onThreadClose}/>
                <Spinner 
                    isSpinning={isFetching}/>
                <div 
                    className="thread"
                    id="thread">
                    {thread.map( 
                        post => {
                            console.log(post.time);
                            return (
                                <ThreadPost 
                                    key={post.id} 
                                    post={post}>
                                    <TimeAgo date={new Date(Date.now())}/>
                                </ThreadPost>
                            )
                        }
                    )}
                </div>
            </div>
        )
    }

    slideThreadUp() {
        console.log("slideThreadUp()")
        Velocity($('#thread'), {top: "0"}, {
            duration: 750,
            easing: [0.215, 0.61, 0.355, 1]
        })

    }

    onThreadClose() {
        console.log("onThreadClose()")
        this.props.closeThread()
        // $('#thread').css('top', window.innerHeight + "px");
        Velocity($('#thread'), {top: window.innerHeight + "px"}, {
            duration: 350,
            easing: [0.215, 0.61, 0.355, 1]
        })
    }
}

function mapStateToProps({thread}) {
    console.log("thread mapping to props", thread)
    return {
        thread: thread.posts,
        isFetching: thread.isFetching,
        postsLoaded: thread.postsLoaded
    }
}

function mapDispatchToProps(dispatch) {
    console.log("dispatching board action");

    return bindActionCreators({closeThread}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Thread);
