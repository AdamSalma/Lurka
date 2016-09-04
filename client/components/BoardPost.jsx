import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchThread } from '../actions';

class BoardPost extends React.Component {
    render(){
        const { fetchThread, post } = this.props;
        const {id, title, comment, date, imgsrc, replies} = post;

        return (
            <div className="post"
                 onClick={() => fetchThread(id)}>
                <img src={imgsrc.sm} />
                <div className="thread-count">
                    R: <b>{replies.textCount}</b> |
                    I: <b>{replies.imgCount}</b>
                </div>
                <div className="thread-op">
                    <b dangerouslySetInnerHTML={{__html: title}} className="title"></b>
                    <div dangerouslySetInnerHTML={{__html: comment}}></div>
                </div>
            </div>
        )
    }
}

function matchDispatchToProps(dispatch) {
    console.log("dispatching thread action");

    return bindActionCreators({fetchThread}, dispatch)
}

export default connect(null, matchDispatchToProps)(BoardPost)
