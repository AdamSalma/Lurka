import React from 'react';
import uuid from "uuid";

export default function({items, handleClick}) { 
    console.info(`Rendering ${items.length} dropdown items`);
    return (
        <div 
            className="dropdown"
            onClick={ ({ target }) => handleClick(target.getAttribute('data-value'))}>
                <div className="dropdown-wrap">
                    {items.map( ({value, text}) => (
                        <div className="tile" key={uuid.v4()} data-value={value}>
                            {text}
                        </div>
                    ))}
                </div>
        </div>
    )
}