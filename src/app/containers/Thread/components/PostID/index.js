import React from 'react';

import './styles';

const PostID = ({ id, tooltip, tooltipPosition="top", className, onClick }) => {
    return (
        <span className='id'>#{id}</span>
    );
};

PostID.displayName = 'PostID';

export default PostID;
