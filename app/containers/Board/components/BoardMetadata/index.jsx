import React from 'react';
import cx from 'classnames';

import './styles';

const BoardMetadata = ({ className, prefix="Viewing", suffix="threads", postsShown=0, totalPosts=0, totalImages, totalReplies }) => {
    return (
        <div className={cx('BoardMetadata', className)}>
            <div>
                {prefix} <span className="highlight">{postsShown}</span> of {totalPosts} {suffix}
            </div>
            {totalImages && totalReplies &&
            <div>
                <span className="stat">Replies: {totalReplies}</span>
                <span className="stat">Images: {totalImages}</span>
                {/*<span className="stat">Shitpost ratio: {totalImages ? Math.round((totalReplies / totalImages) * 100) / 100 : 0}</span>*/}
            </div>}
        </div>
    );
};

BoardMetadata.displayName = 'BoardMetadata';

export default BoardMetadata;
