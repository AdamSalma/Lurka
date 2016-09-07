import React from 'react';

export default ({post}) => {
    const { id, title, date, imgsrc, comment } = post
    return (
        <div className="thread-post">
            <div className="post-info">
                <span className={title ? "subtitle-active" : ""}>{title}</span>
                <span className="dateTime">{date}</span>
                <span className="postNum">No.{id}</span>
                <span className="backlink"></span>
            </div>
            {createImageIfExists(imgsrc)}
            <blockquote>
                <div className="postMessage" 
                     dangerouslySetInnerHTML={{__html: comment}}></div>
            </blockquote>
        </div>
    )
}


function createImageIfExists(imgsrc) {
    if (imgsrc) return <div className="post-img"><img src={imgsrc.sm} /></div>
}