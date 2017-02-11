import React, {Component} from 'react'
import classNames from 'classnames'


export default function ({children, isActive, className}) {
    const classes = classNames('header-panel', className, {
        'animate-in': isActive,
        'animate-out': !isActive
    })

    return (
        <div className={classes}>
            {children}
        </div>
    )
}
