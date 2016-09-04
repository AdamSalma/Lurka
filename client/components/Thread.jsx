import React from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import ThreadPost from './ThreadPost';
import Background from './Background';
import Spinner from './Spinner';

class Thread extends React.Component {

    render() {
        const { thread, isFetching } = this.props
        console.info(`Rendering Thread with ${thread.length} posts`);
        console.log("isFetching?", isFetching);
        return (
            <div className="thread-wrap">
                <Background isVisible={thread.length || isFetching}/>
                <Spinner isSpinning={isFetching}/>
                <div className="thread">{
                    thread.map( post => <ThreadPost key={post.id} post={post}/> )
                }</div>
            </div>
        )
    }


}

function mapStateToProps(state) {
    console.log("thread mapping to props", state)
    return {
        thread: state.thread.posts,
        isFetching: state.thread.isFetching
    }
}

function matchDispatchToProps(dispatch) {
    console.log("dispatching board action");

    return bindActionCreators({}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Thread);
