import './HeaderItem.styles'
import React, {Component} from 'react'
import classes from 'classnames'

import Tooltip from '../Tooltip'

export default ({children, className, ...restProps}) => {
    const headerItemClasses = classes('HeaderItem', className)
    return (
        <div className={headerItemClasses} {...restProps}>
            {children}
        </div>
    )
}
