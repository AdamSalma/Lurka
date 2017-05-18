import './Navbar.styles';
import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';

import IconGroup from './IconGroup';
import ContentButtonGroup from './ContentButtonGroup';
import BoardSpecs from './BoardSpecs';
import Title from './Title'

import {
    HeaderItem,
    LogoText,
    SearchBar,
    Icon
} from '~/components';

import { emitSelectionViewToggle } from '~/events/publishers';

const i = window.appSettings.icons;

class Navbar extends PureComponent {
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
            toggleContentNav,
            cycleContentNav,
            toggleDrawer,
            togglePanel,
            // State
            boardID,
            threadID,
            isThreadOpen,
            isDrawerOpen,
            activePanel,
            boardList
        } = this.props

        const navbarClasses = cx('HeaderNav', {
            'drawer-open': isDrawerOpen
        })

        // TODO: Use selector for this:
        const navbarTitle = boardList.items.length && boardList.items.find(b => b.boardID === boardID).short_desc
        // <Icon
        //    name={i.navbarBackwards}
        //  className='Navbar__backwards' />
        // <Icon
        // name={i.navbarForwards}
        //    className='Navbar__forwards' />

        return (
            <div className={navbarClasses}>
              <div className='background' />
              <div className='content'>
                <HeaderItem className='Navbar--left Navbar__logo'>
                  <LogoText/>
                </HeaderItem>
                <HeaderItem className='Navbar--left'>
                    <Title onTitleClick={() => emitSelectionViewToggle()}>
                        {!!navbarTitle && navbarTitle}
                    </Title>
                </HeaderItem>
                <HeaderItem className='Navbar--right'>
                  <IconGroup
                    activePanel={activePanel}
                    togglePanel={togglePanel}
                    toggleDrawer={toggleDrawer}
                    isDrawerOpen={isDrawerOpen} />
                </HeaderItem>
              </div>
            </div>
        )
    }
}

export default Navbar;

