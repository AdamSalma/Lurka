import './MainNav.styles'
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
import ContentButtonGroup from './ContentButtonGroup'

export default function MainNav(props) {
    const {
        toggleContentNav, cycleContentNav, toggleHeaderPanel,
        boardID, threadID, threadIsActive, activePanel,
        ...restProps
    } = props

    const iconProps = {
        activePanel,
        toggleHeaderPanel,
        icons: [
            'archive', 'watch', 'account'
        ]
    }

    return (
        <div className="MainNav">
            <HeaderItem className="version">
                <LogoText />
            </HeaderItem>

            <HeaderItem>
                <ContentButtonGroup 
                onButtonClick={toggleContentNav} 
                onArrowClick={cycleContentNav}>
                    {!threadIsActive ? `/${boardID}/` : `Thread #${threadID}`}
                </ContentButtonGroup>
            </HeaderItem>

            <HeaderItem className="icons">
                <IconGroup 
                    className="feature-icons"
                    icons={[
                        'archive', 'watch', 'account'
                    ]}
                    activePanel={activePanel}
                    toggleHeaderPanel={toggleHeaderPanel}
                />
                <IconGroup 
                    className="content-icons"
                    icons={[
                        'search', 'filter', 'sort', 'layout'
                    ]}
                    activePanel={activePanel}
                    toggleHeaderPanel={toggleHeaderPanel}
                />
            </HeaderItem>
        </div>
    )
}
