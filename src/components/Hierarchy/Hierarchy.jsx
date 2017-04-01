import './Hierarchy.styles'
import React from "react";

export default ({provider, boardID, threadID}) => {
    return (
        <ul className="hierarchy">
            {provider && <li className="provider">{provider}</li>} 
            {boardID  && <li className="boardID"><span>/</span>{boardID}</li>} 
            {threadID && <li className="threadID"><span>/</span>{threadID}</li>} 
        </ul>
    )
}
