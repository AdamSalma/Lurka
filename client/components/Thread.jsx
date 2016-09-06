import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import ThreadPost from './ThreadPost';
import Background from './Background';
import Spinner from './Spinner';

import {closeThread} from "../actions/thread.actions";

class Thread extends React.Component {
    render() {
        const { thread, isFetching, closeThread} = this.props
        console.info(`Rendering Thread with ${thread.length} posts`);
        console.log("isFetching?", isFetching);
        return (
            <div className="thread-wrap">
                <Background 
                    isVisible={thread.length || isFetching} 
                    closeBackground={closeThread}/>
                <Spinner isSpinning={isFetching}/>
                <div className="thread">{
                    thread.map( post => <ThreadPost key={post.id} post={post}/>)
                }</div>
            </div>
        )
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
