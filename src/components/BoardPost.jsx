import React from 'react';

function unescapeHTML(html) {
    var escapeEl = document.createElement('textarea');
    escapeEl.innerHTML = html;
    return escapeEl.textContent;
}

export default ({ post, onThreadRequest }) => {
    const {id, title, comment, date, imgsrc, replies} = post;

    return (
        <div className="post fade-overflow" onClick={onThreadRequest.bind(null, id)}>
            <img src={imgsrc.sm} />
            <div className="thread-count">
                R: <b>{replies.textCount}</b>
                | I: <b>{replies.imgCount}</b>
            </div>
            <div className="thread-op">
                <b dangerouslySetInnerHTML={{__html: title}} className="title"></b>
                <div  dangerouslySetInnerHTML={{__html: comment}}></div>
            </div>
        </div>
    )
}
