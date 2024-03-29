import React from 'react'
import cx from 'classnames'

import './HeaderGroup.styles'
import { Tooltip } from '~/components'

export default ({children, className, ...restProps}) => {
    return (
        <div className={cx('HeaderGroup', className)} {...restProps}>
            {children}
        </div>
    )
}
