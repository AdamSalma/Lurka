import './Line.styles'
import React from "react"

export default ({ isVertical }) => {
    return isVertical ? 
        <span className='Pipe'/> : 
        <span className="Line"/>
}
