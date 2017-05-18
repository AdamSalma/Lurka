import './Header.styles'
import React, {
    Component
} from 'react';

import {
    bindMembersToClass
} from '~/utils'

import Navbar from './Navbar'
import Panels from './Panels'
import Footer from './Footer';

// import Drawer from './Drawer'

import {
    onDrawerToggle
} from '~/events/subscribers';

import {
    DRAWER_TOGGLED,
    PANEL_TOGGLED
} from '~/redux/types'


class Header extends Component {
    constructor(props) {
        super(props);

        bindMembersToClass(this, 'toggleDrawer', 'togglePanel')

        this.state = {
            isDrawerOpen: props.isDrawerOpen,
            activePanel: null
        }
    }

    render() {
        const {
            isDrawerOpen,
            activePanel
        } = this.state

        return (
            <div
              id='header'
              className='Header'>
              <Navbar
                {...this.props}
                isDrawerOpen={isDrawerOpen}
                activePanel={activePanel}
                togglePanel={this.togglePanel}
                toggleDrawer={this.toggleDrawer} />
              <Panels
                {...this.props}
                isDrawerOpen={isDrawerOpen}
                activePanel={activePanel} />
              <Footer {...this.props}/>
            </div>
        )
    }

    @onDrawerToggle
    toggleDrawer() {
        console.log('toggleDrawer()')
        this.setState(state => {
            return {
                isDrawerOpen: !state.isDrawerOpen
            }
        })
        setTimeout(this.props.toggleDrawer, 300)
    }

    togglePanel(panel) {
        console.log('togglePanel()')
        this.setState(state => {
            const samePanel = state.activePanel === panel
            return {
                activePanel: samePanel ? null : panel
            }
        })
        this.forceUpdate()
    }
}

export default Header
