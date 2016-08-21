import React from 'react';

import { fetchThread } from '../actions/MemeActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class BoardPost extends React.Component {


    render(){
        const { fetchThread, post } = this.props;
        const {id, title, comment, date, imgsrc, replies} = post;

        return (
            <div className="post"
                 onClick={fetchThread({threadID:id})}>
                <img src={imgsrc.sm} />
                <div className="thread-count">
                    R: <b>{replies.textCount}</b>
                     | I: <b>{replies.imgCount}</b>
                </div>
                <div className="thread-op">
                    <b dangerouslySetInnerHTML={{__html: title}} className="title"></b>
                    <div dangerouslySetInnerHTML={{__html: comment}}></div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log("Mapping state to props. state:", state);

    return {
        thread: state.thread
    }
}

function matchDispatchToProps(dispatch) {
    console.log("dispatching thread action");

    return bindActionCreators({fetchThread}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(BoardPost)
