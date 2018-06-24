import React from 'react';
import { setHTML } from '~/utils/react';
import { Line } from '~/components/UI';
import Header from './BoardPostHeader';

const BoardPostComment = ({ title, comment, time, replies }) => {
    return (
        <div className="comment-wrap" tabIndex="-1">
            <div className="comment-slider">
                <Header replies={replies} time={time}/>
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
