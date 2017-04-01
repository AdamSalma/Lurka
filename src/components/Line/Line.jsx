import React from "react"

export default ({ isVertical }) => {
    return isVertical ? 
        <span className='pipe'/> : 
        <span className="line"/>
}
