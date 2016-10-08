import React from 'react';
import Tooltip from '../Tooltip';

export default ({ post, fetchThread }) => {
    const {id, title, comment, date, imgsrc, replies} = post;

    return (
        <div 
            className="board-post"
            onClick={() => fetchThread(id)}
        >
            <img src={imgsrc.sm} />
            <Tooltip>
                <div className="count">
                    <span>
                        <i className="fa fa-comments"></i>
                        <b>{replies.textCount}</b>
                    </span>
                    <span>
                        <i className="fa fa-picture-o"></i>
                        <b>{replies.imgCount}</b>
                    </span>
                </div>
            </Tooltip>
            <div className="op">
                <b dangerouslySetInnerHTML={{__html: title}} className="title"></b>
                <div dangerouslySetInnerHTML={{__html: comment}}></div>
            </div>
        </div>
    )
}
