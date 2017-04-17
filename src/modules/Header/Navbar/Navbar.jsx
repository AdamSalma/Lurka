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
            toggleContentNav, cycleContentNav, toggleHeaderPanel,
            boardID, threadID, threadIsActive, activePanel,
            isDrawerOpen, toggleDrawer,
            ...restProps
        } = this.props

        const navbarClasses = cx('HeaderNav', {
            'drawer-open': isDrawerOpen
        })

        return (
            <div className={navbarClasses}>
                <div className="background"/>
                <div className='content'>
                    <HeaderItem className="left">
                        <LogoText />
                    </HeaderItem>

                    <HeaderItem className="center">
                        <ContentButtonGroup 
                        onButtonClick={toggleContentNav} 
                        onArrowClick={cycleContentNav}>
                            {!threadIsActive ? `${boardID}` : `Thread #${threadID}`}
                        </ContentButtonGroup>
                    </HeaderItem>

                    <HeaderItem className="right">
                        <IconGroup 
                            activePanel={activePanel}
                            toggleHeaderPanel={toggleHeaderPanel}
                            onSearchClick={toggleDrawer}
                        />
                    </HeaderItem>
                </div> 
            </div> 
        );
    }
}

export default Navbar;
