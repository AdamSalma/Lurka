import React, { PropTypes } from 'react';
import './BoardToolbarMetadata.styles'

const ViewCount = ({ viewCount }) => (
    <div className="BoardToolbarMetadata__ViewCount">
        Viewing <span className="highlight">{viewCount}</span> of {viewCount} threads.
    </div>
)

const FilterCount = ({ filterCount }) => (
    <div className="BoardToolbarMetadata__FilterCount">
        {filterCount} Filtered.
    </div>
)

const Stats = ({ replies=0, images=0 }) => (
        // comments: {replies}, images: {images}
    <div className="BoardToolbarMetadata__FilterCount">
        R: {replies} / I: {images}
    </div>
)

const BoardToolbarMetadata = ({ className, posts, filteredPosts, statistics }) => {
    return (
        <div className={`BoardToolbarMetadata ${className}`}>
            <ViewCount viewCount={posts.length}/>
            {/*<FilterCount filterCount={0}/>
            <Stats {...statistics}/>*/}
        </div>
    );
};

BoardToolbarMetadata.displayName = 'BoardToolbarMetadata';

BoardToolbarMetadata.propTypes = {
    className: PropTypes.string,
};

export default BoardToolbarMetadata;
