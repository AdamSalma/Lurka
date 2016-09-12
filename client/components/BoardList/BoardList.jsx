import React from 'react';

export default function({boardList, fetchBoard}) { 
    return (
        <select className="board-list">
            {boardList.map( ({board, title}) => {
                return <option onClick={fetchBoard(board)}> /{board}/ - {title} </option>
            })}
        </select>
    )
}