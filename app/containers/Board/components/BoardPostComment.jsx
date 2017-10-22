import React from 'react';
import { setHTML } from '~/utils/react';
import { BoardPostHeader as PostHeader } from '.';
import { Line } from '~/components';

const BoardPostComment = ({ title, comment, time, replies }) => {
    return (
        <div className="comment-wrap">
            <div className="comment-slider">
                <PostHeader replies={replies} time={time}/>
                <Line />
                <div className="op">
                    { title &&
                        <div {...setHTML(title)} className="title" />
                    }
                    <div {...setHTML(comment)} className="comment"/>
                </div>
            </div>
        </div>
    );
};

BoardPostComment.displayName = 'BoardPostComment';

export default BoardPostComment;
