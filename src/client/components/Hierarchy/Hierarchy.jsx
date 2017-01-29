import React from "react";

export default ({provider, boardID, threadID}) => {
    return (
        <ul className="hierarchy">
            {provider && <li>{provider}</li>} 
            {boardID  && <li>/{boardID}</li>} 
            {threadID && <li>/{threadID}</li>} 
        </ul>
    )
}
