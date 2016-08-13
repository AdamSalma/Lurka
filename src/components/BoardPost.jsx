import React from 'react';

export default ( me ) => {
    console.error(me)
    const {id, title, comment, date, imgsrc, replies} = thread;

    return (
        <div className="post fade-overflow" onClick={onThreadRequest.bind(null, id)}>
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
