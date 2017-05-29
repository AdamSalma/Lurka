import './MainHeader.styles';
import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';

import {
    IconGroup,
    Title,
    HeaderItem,
    BoardSpecs,
    ContentButtonGroup
} from '../../components';

import {
    LogoText,
    SearchBar,
    Icon,
    Logo,
    Notification,
} from '~/components';

import {
    emitContentViewToggle,
    emitSubHeaderToggle
} from '~/events/publishers';

const i = window.appSettings.icons;


class MainHeader extends PureComponent {
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
        //     scrollHeader, closeThread, toggleMainHeader,

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

        const headerClass = cx('MainHeader', {
            'drawer-open': isDrawerOpen
        });

        // TODO: Use selector for this:
        const navbarTitle = boardList.items.length && boardList.items.find(b => b.boardID === boardID).short_desc
        // <Icon
        //    name={i.navbarBackwards}
        //  className='MainHeader__backwards' />
        // <Icon
        // name={i.navbarForwards}
        //    className='MainHeader__forwards' />

        return (
            <div className={headerClass}>
              <div className='background' />
              <div className='content'>
                <HeaderItem className='MainHeader--left MainHeader__logo'>
                  <Logo/>
                  <LogoText/>
                </HeaderItem>
                <HeaderItem className='MainHeader--center' onMouseEnter={this.onTitleHover}>
                    <Title onTitleClick={(e) => emitContentViewToggle()}>
                        {!!navbarTitle && navbarTitle}
                    </Title>
                </HeaderItem>
                <HeaderItem className='MainHeader--right IconGroup'>
                    <Icon
                        name={i.navbarAccount}
                        title='Account'
                        onClick={() => togglePanel('account')} />
                      <Notification number={0}>
                        <Icon
                          name={i.navbarEye}
                          title='Thread Watcher'
                          onClick={() => togglePanel('watch')} />
                      </Notification>
                      <Icon
                        name={i.navbarArchive}
                        title='Local archive'
                        onClick={() => togglePanel('archive')} />
                </HeaderItem>
              </div>
            </div>
        )
    }

    onTitleHover() {
        // Ensure subheader can be accessed in all scenarios
        emitSubHeaderToggle(true);
    }
}

export default MainHeader;

