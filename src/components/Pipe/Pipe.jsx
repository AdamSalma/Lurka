import './Pipe.styles'
import React from "react"

export default ({ className }) => {
    return <div className={[
        'Pipe',
        className
    ].join(' ')}/>
}
