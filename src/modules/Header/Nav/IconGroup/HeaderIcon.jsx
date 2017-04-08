import React from 'react'
import classes from 'classnames'
import {HeaderItem, Icon} from '~/components'

const HeaderIcon = ({name, onClick, active, ...restProps}) => {
    return (
        <HeaderItem 
        className={classes("HeaderIcon", {"active": active})} 
        onClick={onClick} {...restProps}>
            <Icon name={name}/>
        </HeaderItem>
    )
}

export default HeaderIcon
