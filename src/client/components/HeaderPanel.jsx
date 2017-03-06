import React, {Component} from 'react'
import classes from 'classnames'


export default function ({children, isActive, className}) {
    const panelClasses = classes('header-panel', className, {
        'animate-in': isActive,
        'animate-out': !isActive
    })

    return (
        <div className={panelClasses}>
            {children}
        </div>
    )
}
