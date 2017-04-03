import './SubNav.styles'
import React, {Component} from 'react'
import cx from 'classnames'

import {
    HeaderItem
} from '~/components'

import IconGroup from '../HeaderIconGroup'

export default function SubNav(props) {
    const {
        toggleHeaderPanel, activePanel, isHomePage
    } = props

    return (
        <div className="SubNav">
            { isHomePage 
                ? <IconGroup icons={['home', 'star', 'info']}
                    className="home-icons"
                    activePanel={activePanel}
                    toggleHeaderPanel={toggleHeaderPanel}
                  />
                : <IconGroup icons={['search', 'filter', 'sort', 'layout']}
                    className="content-icons"
                    activePanel={activePanel}
                    toggleHeaderPanel={toggleHeaderPanel}
                  /> 
            }
        </div>
    )
}
