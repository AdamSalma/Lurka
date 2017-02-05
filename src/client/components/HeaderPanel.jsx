import React, {Component} from 'react'
import classNames from 'classnames'


export default function ({children, isActive}) {
    const classes = classNames('header-panel', {
        'animate-in': isActive,
        'animate-out': !isActive
    })

    return (
        <div className={classes}>
            {children}
        </div>
    )
}
