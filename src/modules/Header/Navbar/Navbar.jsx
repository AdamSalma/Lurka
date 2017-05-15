import './Navbar.styles';

import React, {
    PureComponent,
    PropTypes
} from 'react';

import cx from 'classnames';

import IconGroup from './IconGroup';

import ContentButtonGroup from './ContentButtonGroup';

import BoardSpecs from './BoardSpecs';

import {
    HeaderItem,
    LogoText,
    SearchBar,
    Icon
} from '~/components';

import {
    emitContentViewToggle
} from '~/events/publishers';

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

        return (
            <div className={navbarClasses}>
              <div className='background' />
              <div className='content'>
                <HeaderItem className='Navbar--left'>
                  <div className='title'>
                    {navbarTitle}
                  </div>
                </HeaderItem>
                <HeaderItem className='Navbar--left'>
                  <Icon name={i.navbarBackwards} />
                  <Icon name={i.navbarForwards} />
                  <Icon name={i.navbarRefresh} />
                  <Icon name={i.navbarCompose} />
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

