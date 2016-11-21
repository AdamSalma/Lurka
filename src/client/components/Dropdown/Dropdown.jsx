import React from 'react';
import uuid from "uuid";

export default function ({items, className, handleClick}) { 
    console.info(`Rendering ${items.length} dropdown items`);
    return (
        <ul className={className} onClick={ (event) => handleClick(event) }>
            {items.map(el => <li key={uuid.v4()} className="item">{el}</li>)}
        </ul>
    )
}