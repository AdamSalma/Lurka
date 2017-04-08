import './Nav.styles'
import React, { Component, PropTypes } from 'react';

import MainNav from './MainNav'
import SubNav from './SubNav'

class Nav extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
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

        return (
            <div className={[
                'Nav',
                this.props.className
            ]}>
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

                />
            </div> 
        );
    }
}

export default Nav;
