import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import classNames from 'classnames';
import $ from 'jquery'
import Velocity from 'velocity-animate';

import ThreadPost from '../ThreadPost';
import Background from '../Background';
import Spinner from '../Spinner';

import {closeThread} from "../../actions/thread.actions";

class Thread extends React.Component {
    render() {
        const { thread, isFetching, closeThread} = this.props
        console.info(`Rendering Thread with ${thread.length} posts`);
        const threadRef = this.refs.thread;
        const threadWrapClasses = classNames({
            "thread-wrap": true,
            "thread-wrap-active": thread.length || isFetching
        });
        
        if (threadRef && threadRef.offsetTop > 0) this.slideThreadUp(threadRef);

        return (
            <div className={threadWrapClasses}>
                <Background 
                    isVisible={thread.length || isFetching} 
                    closeBackground={closeThread}/>
                <Spinner 
                    isSpinning={isFetching}/>
                <div 
                    className="thread"
                    ref="thread">
                    {thread.map( 
                        post => <ThreadPost 
                                    key={post.id} 
                                    post={post}/>
                    )}
                </div>
            </div>
        )
    }

    slideThreadUp(thread){
        console.log("Starting thread animation")
        // document.querySelector('.thread').style.top = window.innerHeight + "px"
        const $thread = $(thread)
        $thread.css('top', window.innerHeight + "px")
        Velocity($thread, {top: "0"}, {
            duration: 750,
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
