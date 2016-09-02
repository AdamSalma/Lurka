import React from 'react';

export default (post) => {

    const { id, title, date, imgsrc, comment } = post.post
    console.log(id, title, date, imgsrc, comment)
    return (
        <div className="thread-post">
            <div className="post-info">
                <span className={title ? "subtitle-active" : ""}>{title}</span>
                <span className="dateTime">{date}</span>
                <span className="postNum">No.{id}</span>
                <span className="backlink"></span>
            </div>
            <div className="post-img"><img src={imgsrc.sm} /></div>
            <blockquote>
                <div className="postMessage" dangerouslySetInnerHTML={{__html: comment}}></div>
            </blockquote>
        </div>
    )
}
