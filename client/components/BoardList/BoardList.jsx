import React from 'react';

export default function({boardList, fetchBoard, provider}) { 
    return (
        <select 
        	className="board-list"
        	onChange={({target}) => fetchBoard({boardID: target.value, provider})}>
	            {boardList.map( ({board, title}) => (
                	<option key={board} value={board}>
                		/{board}/ - {title} 
              		</option>
	            ))}
        </select>
    )
}