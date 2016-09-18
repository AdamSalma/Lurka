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
                    R: <b>{replies.textCount}</b> |
                    I: <b>{replies.imgCount}</b>
                </div>
            </Tooltip>
            <div className="op">
                <b dangerouslySetInnerHTML={{__html: title}} className="title"></b>
                <div dangerouslySetInnerHTML={{__html: comment}}></div>
            </div>
        </div>
    )
}
