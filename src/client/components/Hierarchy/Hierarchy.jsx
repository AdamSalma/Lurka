import React from "react";
import Line from '../Line'

export default ({provider, boardID, threadID}) => {

    return (
        <ul className="hierarchy">
            {provider && <li>{provider}</li>} 
            {boardID  && <li><Line isVertical/>{boardID}<Line isVertical/></li>} 
            {threadID && <li>{threadID}</li>} 
        </ul>
    )
}
