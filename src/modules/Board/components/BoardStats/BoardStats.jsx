import './BoardStats.styles';
import React, { PropTypes } from 'react';
import cx from 'classnames';

const BoardStats = ({ className, boardName, posts, images, replies }) => {
    return (
        <div className={cx("BoardStats", className)}>
            <span className="BoardStats__board">{boardName}</span>
            <span className="BoardStats__posts">{posts} Posts</span>
            <span className="BoardStats__images">{images} Images</span>
            <span className="BoardStats__replies">{replies} Replies</span>
        </div>
    );
};

BoardStats.displayName = 'BoardStats';

BoardStats.propTypes = {
    className: PropTypes.string,
    boardName: PropTypes.string,
    posts: PropTypes.number,
    images: PropTypes.number,
    replies: PropTypes.number,
};

export default BoardStats;
