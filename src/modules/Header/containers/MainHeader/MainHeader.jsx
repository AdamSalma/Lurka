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
    Tooltip
} from '~/components';

import {
    emitContentViewToggle,
    emitSubHeaderToggle,
    emitSettingsToggle
} from '~/events/publishers';

import {bindMembersToClass} from '~/utils/react';

const i = window.appSettings.icons;


class MainHeader extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.toggleFlag = props.isSettingsOpen || false
        bindMembersToClass(this, 'onSettingsClick');
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
                    <Tooltip className="navtip" content="Thread Watcher" position="bottom">
                      <Notification number={1}>
                        <Icon
                          name={i.navbarEye}
                          onClick={() => togglePanel('watch')} />
                      </Notification>
                    </Tooltip>
                    <Tooltip className="navtip" content="Bookmarks" position="bottom">
                      <Icon
                        name={i.navbarBookmark}
                        onClick={() => togglePanel('bookmarks')} />
                    </Tooltip>
                    <Tooltip className="navtip" content="Media Database" position="bottom">
                      <Icon
                        name={i.navbarDB}
                        onClick={() => togglePanel('database')} />
                    </Tooltip>
                    <Tooltip className="navtip" content="Settings" position="bottom">
                      <Icon
                        name={i.navbarSettings}
                        onClick={this.onSettingsClick} />
                    </Tooltip>
                </HeaderItem>
              </div>
            </div>
        )
    }

    onSettingsClick(e) {
        emitSettingsToggle(this.toggleFlag);
        this.toggleFlag = !this.toggleFlag;
    }

    onTitleHover() {
        // Ensure subheader can be accessed in all scenarios
        emitSubHeaderToggle(true);
    }
}

export default MainHeader;
