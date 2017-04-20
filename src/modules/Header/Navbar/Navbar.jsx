import './Navbar.styles'
import React, { Component, PropTypes } from 'react';
import cx from 'classnames'

import IconGroup from './IconGroup'
import ContentButtonGroup from './ContentButtonGroup'

import {HeaderItem, LogoText} from '~/components'


class Navbar extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        // const {
        //     // Actions
        //     //State
        //     scrollHeader, closeThread, toggleNavbar,

        // } = this.props;

        const {
            // Actions
            toggleContentNav, cycleContentNav, toggleDrawer, togglePanel,
            // State
            boardID, threadID, isThreadOpen, isDrawerOpen, activePanel,
        } = this.props

        const navbarClasses = cx('HeaderNav', {
            'drawer-open': isDrawerOpen
        })
        console.log('Navbar render')

        return (
            <div className={navbarClasses}>
                <div className="background"/>
                <div className='content'>
                    <HeaderItem className="left">
                        <LogoText />
                    </HeaderItem>
{
                    <HeaderItem className="center">
                        <ContentButtonGroup
                        onButtonClick={toggleContentNav}
                        onArrowClick={cycleContentNav}>
                            {!isThreadOpen ? `/${boardID}/` : `#${threadID}`}
                        </ContentButtonGroup>
                    </HeaderItem>}

                    <HeaderItem className="right">
                        <IconGroup
                            activePanel={activePanel}
                            togglePanel={togglePanel}
                            toggleDrawer={toggleDrawer}
                            isDrawerOpen={isDrawerOpen}
                        />
                    </HeaderItem>
                </div>
            </div>
        );
    }
}

export default Navbar;
