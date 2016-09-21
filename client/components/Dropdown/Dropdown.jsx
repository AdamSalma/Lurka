import React from 'react';
import uuid from "uuid";

export default function({items, handleClick}) { 
    return (
        <div 
        	className="dropdown"
        	onClick={ ({ target }) => handleClick(target.getAttribute('data-value'))}>
        		<span>Dropdown Here:</span>
        		{console.error(`Rendering ${items.length} dropdown items`)}
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