import React from 'react';

export default function({items, handleClick}) { 
    return (
        <div 
        	className="dropdown"
        	onClick={handleClick.bind(null, event.target.getAttribute('data-value'))}>
        		<div className="dropdown-wrap">
		            {items.map( ({value, text}) => (
	                	<div className="tile" key={value} data-value={value}>
	                		{text}
	              		</div>
		            ))}
        		</div>
        </div>
    )
}