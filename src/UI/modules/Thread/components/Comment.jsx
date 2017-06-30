import React from 'react';
import {setHTML} from '~/utils/react';

const Comment = ({ comment }) => {
    return (
        <blockquote {...setHTML(comment)}/>
    );
};

Comment.displayName = 'Comment';

export default Comment;
