import React, {Component} from 'react'
import classNames from 'classnames'

import Tooltip from './Tooltip'

export default ({children, className}) => {
    const classes = classNames('header-item', className)
    return (
        <div className={classes}>
            {children}
        </div>
    )
}
