import './SubNav.styles'
import React, {Component} from 'react'
import cx from 'classnames'

import {
    Icon,
    LogoText,
    SearchBox,
    Hierarchy,
    HeaderItem
} from '~/components'

import IconGroup from '../HeaderIconGroup'

export default function SubNav(props) {
    const {
        toggleHeaderPanel, activePanel
    } = props

    const iconProps = {
        activePanel,
        toggleHeaderPanel,
        icons: [
            'search', 'filter', 'sort', 'layout'
        ]
    }

    return (
        <div className="SubNav">
            <HeaderItem>
                <IconGroup {...iconProps}/>
            </HeaderItem>
        </div>
    )
}
