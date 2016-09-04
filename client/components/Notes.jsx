import React from 'react';
import Note from './Note'

export default ({ notes, onDelete }) => (
    <ul>{notes.map( ({id, task}) =>
        <li key={id}>
            <Note
                task={task}
                onDelete={onDelete.bind(null, id)}/>
        </li>
    )}</ul>
)
