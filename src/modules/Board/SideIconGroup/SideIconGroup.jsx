import './SideIconGroup.styles'
import React from 'react'
import cx from 'classnames'

export default function SideIconGroup({children, className}) {
    return (
        <div className={cx(className, "SideIconGroup")}>
            {children}
        </div>
    );
}
