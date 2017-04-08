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

import IconGroup from '../IconGroup'
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
            <div className="background"/>
            <div className='content'>
                <HeaderItem className="left">
                    <LogoText />
                </HeaderItem>

                <HeaderItem className="center">
                    <IconGroup {...iconProps} icons={[
                        'search', 'filter'
                    ]}/>
                </HeaderItem>

                <HeaderItem className="center">
                    <ContentButtonGroup 
                    onButtonClick={toggleContentNav} 
                    onArrowClick={cycleContentNav}>
                        {!threadIsActive ? `/${boardID}/` : `Thread #${threadID}`}
                    </ContentButtonGroup>
                </HeaderItem>

                <HeaderItem className="center">
                    <IconGroup {...iconProps} icons={[
                        'sort', 'layout'
                    ]}/>
                </HeaderItem>

                <HeaderItem className="right">
                    <IconGroup {...iconProps}/>
                </HeaderItem>
            </div> 
        </div>
    )
}
