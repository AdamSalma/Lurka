import './Header.styles'
import React, { Component } from "react";
import classes from "classnames";

import {bindMembersToClass} from '~/utils'

import Navbar from './Navbar'
import Panels from './Panels'
import Drawer from './Drawer'

class Header extends Component {
    constructor(props) {
        super(props);
        bindMembersToClass(this, 'toggleDrawer', 'togglePanel')
        // bindMembersToClass(this,
        //     'handleKeyUp',
        //     'toggleActive',
        //     'handleIconClick'
        // )
        this.state = {
            isDrawerOpen: props.isDrawerOpen,
            activePanel: null
        }
    }

    render() {
        // const {
        //     // Actions
        //     scrollHeader, closeThread, toggleNavbar, toggleHeaderPanel,
        //     //State
        //     threadIsActive,
        //     provider,
        //     boardID,
        //     threadID,
        //     activePanel,
        //     isNavbarOpen
        // } = this.props;

        const {
            isDrawerOpen,
            activePanel
        } = this.state

        return (
            <div id="header" className="Header">
                <Navbar {...this.props}
                    isDrawerOpen={isDrawerOpen}
                    activePanel={activePanel}
                    togglePanel={this.togglePanel}
                    toggleDrawer={this.toggleDrawer}
                />
                <Panels {...this.props}
                    isDrawerOpen={isDrawerOpen}
                    activePanel={activePanel}/>
                <Drawer {...this.props}
                    isDrawerOpen={isDrawerOpen}/>
            </div>
        )
    }

    toggleDrawer() {
        console.log("toggleDrawer()")
        this.setState( state => {
            return {
                isDrawerOpen: !state.isDrawerOpen
            }
        })
        this.props.toggleDrawer()
    }

    togglePanel(panel) {
        console.log("togglePanel()")
        this.setState( state => {
            const samePanel = state.activePanel === panel
            return {
                activePanel: samePanel ? null : panel
            }
        })
    }
}

export default Header
