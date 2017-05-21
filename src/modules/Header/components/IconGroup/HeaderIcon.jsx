import React from 'react'
import cx from 'classnames'
import {
    HeaderItem,
    ButtonCircle,
    Icon
} from '~/components'

const HeaderIcon = ({
        name,
        onClick,
        active,
        ...restProps
    }) => {
    return (
        <ButtonCircle
          className={cx('HeaderIcon', {'active': active})}
          {...restProps}>
          <Icon
            onClick={onClick}
            name={name} />
        </ButtonCircle>
    )
}

export default HeaderIcon
