import React from 'react';
import {setHTML} from '~/utils';

const Comment = ({ comment }) => {
    return (
        <blockquote {...setHTML(comment)}/>
    );
};

Comment.displayName = 'Comment';

export default Comment;
