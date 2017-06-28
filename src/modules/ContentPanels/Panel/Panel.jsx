import './Panel.styles'
import React, {Component} from 'react'
import cx from 'classnames'


export default function ({isDrawerOpen, children, isActive, isHidden, className}) {
    const panelClasses = cx('header-panel', className, {
        // compare directly because there will be scenarios with no
        // animate-in animate-out
        'animate-in': isActive && !isHidden,
        'animate-out': !isActive && !isHidden,
        'shift-left': isDrawerOpen
    })

    return (
        <div className={panelClasses}>
            {children}
        </div>
    )
}
