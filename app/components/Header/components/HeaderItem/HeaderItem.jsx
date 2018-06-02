import React from 'react'
import cx from 'classnames'

import './HeaderItem.styles'
import Tooltip from '~/components/UI/Tooltip'

export default ({children, className, ...restProps}) => {
    return (
        <div className={cx('HeaderItem', className)} {...restProps}>
            {children}
        </div>
    )
}
