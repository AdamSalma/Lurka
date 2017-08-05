import './Line.styles'
import React from "react"

export default ({ className }) => {
    return <div className={[
        'Line',
        className
    ].join(' ')}/>
}
