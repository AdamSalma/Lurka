import './Header.styles'
import React, { Component } from "react";
import classes from "classnames";

import {bindMembersToClass} from '~/utils'

import Nav from './Nav'
import Panels from './Panels'
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
                <Nav {...this.props}/>
                <Panels {...this.props}/>
            </div>
        )
    }
}



