import React from 'react';

export default ({ task, onDelete }) => (
    <div>
        <span>{task}</span>
        <button onFocus={onDelete}>x</button>
    </div>
)
