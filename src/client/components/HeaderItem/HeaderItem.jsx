import React, {Component} from 'react'
import Tooltip from '../Tooltip'
import classNames from 'classnames'

import Velocity from "velocity-animate"

export default ({children, className}) => {
    const classes = classNames('header-item', className)
    return (
        <div className={classes}>
            {children}
        </div>
    )
}
