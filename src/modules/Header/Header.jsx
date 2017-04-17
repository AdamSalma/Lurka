import './Header.styles'
import React, { Component } from "react";
import classes from "classnames";

import {bindMembersToClass} from '~/utils'

import Navbar from './Navbar'
import Panels from './Panels'
import Drawer from './Drawer'
// import DropdownNav from './DropdownNav'


export default class Header extends Component {
    constructor(props) {
        super(props);
        // bindMembersToClass(this, 
        //     'handleKeyUp',
        //     'toggleActive',
        //     'handleIconClick'
        // )
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


        return (
            <div id="header" className="Header">
                <Navbar {...this.props}/>
                <Panels {...this.props}/>
                <Drawer {...this.props}/>
            </div>
        )
    }
}



