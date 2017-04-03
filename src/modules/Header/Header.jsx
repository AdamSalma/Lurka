import './Header.styles'
import React, { Component } from "react";
import classes from "classnames";

import {bindMembersToClass} from '~/utils'

import MainNav from './MainNav'
import SubNav from './SubNav'
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
        const { 
            // Actions
            scrollHeader, closeThread, toggleNavbar, toggleHeaderPanel,
            //State
            threadIsActive, 
            provider, 
            boardID, 
            threadID, 
            activePanel, 
            isNavbarOpen
        } = this.props;

        const placeholder = `Search ${threadIsActive ? "thread" : "board"} ...`

        return (
            <div id="header" className="Header">
                <div className="background"/>
                <div className='content'>
                    <MainNav 
                        activePanel={activePanel}
                        toggleHeaderPanel={toggleHeaderPanel}
                        toggleContentNav={() => console.log("toggleContentNav")}
                        cycleContentNav={({left, right}) => 
                            console.log(`cycleContentNav. left: ${left}, right: ${right}`)}
                        threadID={threadID}
                        boardID={boardID}
                        threadIsActive={threadIsActive}
                    />
                    <SubNav 
                        activePanel={activePanel}
                        toggleHeaderPanel={toggleHeaderPanel}
                        threadIsActive={threadIsActive}

                        isHomePage={false} 
                    />
                    {/*TODO: Add isHomePage to initialState ^^*/}
                </div>
            </div>
        )
    }
}



