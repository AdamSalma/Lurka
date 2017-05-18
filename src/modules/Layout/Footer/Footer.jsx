import './Footer.styles';

import React, {
    PureComponent,
    PropTypes
} from 'react';

import cx from 'classnames';

import {
    HeaderItem as FooterSpacer,
    LogoText,
    SearchBar,
    Icon
} from '~/components';

import {
    emitContentViewToggle
} from '~/events/publishers';

const i = window.appSettings.icons;

class Footer extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
    }

    render() {
        const {
            toggleContentNav,
            cycleContentNav,
            toggleDrawer,
            togglePanel,
            boardID,
            threadID,
            isThreadOpen,
            isDrawerOpen,
            activePanel,
            boardList
        } = this.props

        const footerClasses = cx('Footer', {
            'drawer-open': isDrawerOpen
        })

        // TODO: Use selector for this:
        const footerTitle = boardList.items.length && boardList.items.find(b => b.boardID === boardID).short_desc

        return (
            <div className={footerClasses}>
              <div className='background' />
              <div className='content'>
                <FooterSpacer className='Footer__logo Footer--left'>
                  <LogoText />
                </FooterSpacer>
                <FooterSpacer className='Footer__logo Footer--left'>
                  Searching board...
                </FooterSpacer>
                <FooterSpacer className='Footer--right Footer__search'>
                  <SearchBar placeholder={`Search /${boardID}/`} />
                </FooterSpacer>
                <FooterSpacer className='Footer--right'>
                  <Icon name={i.footerSort} />
                  <Icon name={i.footerFilter} />
                  <Icon name={i.footerLayout} />
                  <Icon name={i.footerInfo} />
                  <Icon name={i.footerClose} />
                </FooterSpacer>
              </div>
            </div>
            );
    }
}

export default Footer;

