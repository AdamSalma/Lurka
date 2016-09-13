import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

export default function({post, fetchThread}) {
    const {id, title, comment, date, imgsrc, replies} = post;

    return (
        <div className="board-post"
             onClick={() => fetchThread(id)}>
            <img src={imgsrc.sm} />
            <div className="count">
                R: <b>{replies.textCount}</b> |
                I: <b>{replies.imgCount}</b>
            </div>
            <div className="op">
                <b dangerouslySetInnerHTML={{__html: title}} className="title"></b>
                <div dangerouslySetInnerHTML={{__html: comment}}></div>
            </div>
        </div>
    )
}