import React from 'react';
import Tooltip from '../Tooltip';
import Velocity from "velocity-animate"

export default ({ post, fetchThread, reshuffle }) => {
    const {id, title, comment, date, imgsrc, replies} = post;
    return (
        <div 
            id={"t"+id}
            className="board-post"
            onClick={() => fetchThread(id)}
            onMouseEnter={moveCommentUp.bind(null, id)}
        >
            <div className="image-wrap">   
                <img src={imgsrc.sm} onLoad={reshuffle}/>
            </div>   
            <div className="comment-wrap">
                {renderStatusBar(replies)}
                <div className="op">
                    <b dangerouslySetInnerHTML={{__html: title}} className="title" />
                    <div dangerouslySetInnerHTML={{__html: comment}} />
                </div>
            </div>
        </div>
    )
}


function renderStatusBar(replies) {
    return <div className="count">
        <span>
            <span>
                <i className="mdi mdi-comment-text"></i>
                <b>{replies.textCount}</b>
            </span>
            <span className="updater updater-replycount">
                +1
            </span>
        </span>
        <span>
            <span>
                <i className="mdi mdi-message-image"></i>
                <b>{replies.imgCount}</b>
            </span>
            <span className="updater updater-imgcount">
                +1
            </span>
        </span>
    </div>
}

const maxHeight = 400;
const maxMoveDistance = 100;
function moveCommentUp(id) {
    const 
        $target = $("#t"+id),
        kids = $target.children(),
        commentHeight = kids[1].clientHeight,
        imgHeight = kids[0].clientHeight;

    console.info($target)
    if (imgHeight + commentHeight > maxHeight ) {
        // comment is long and offscreen; make it more viewable by moving it up
        
        // move by difference, else if that would move comment outside thread, use image height (scroll to top) ;
        const offScreenAmount = commentHeight - (maxHeight - imgHeight) + 5 // 5px for padding at bottom of comment
        const height = imgHeight/1.5 // 3/4 of image height
        const distance = offScreenAmount < height ? offScreenAmount : height
        Velocity(kids[1], {top: `-${distance}px`}, 200, "ease-out")
        $target.one('mouseleave', ()=>Velocity(kids[1], {top: 0}, 200))

    }

}

function revertCommentDown() {

}