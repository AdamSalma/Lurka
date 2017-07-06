import './MainHeader.styles';
import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';

/* Header Specific components */
import {
    IconGroup,
    HeaderTitle,
    HeaderGroup,
    BoardSpecs,
    ContentButtonGroup,
    FullLogo,
    SlideDownBG
} from '../../components';

/* Generic Components */
import {
    SearchBar,
    Icon,
    Notification,
    Tooltip
} from '~/components';

/* Events */
import {
    emitContentViewToggle,
    emitSubHeaderToggle,
    emitSettingsToggle
} from '~/events/publishers';
import { onContentViewToggle } from '~/events/subscribers';

/* Helpers */
import { bindMembersToClass } from '~/utils/react';

const i = window.appSettings.icons;


class MainHeader extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
    };

    state = {
        isContentInView: true
    }

    constructor(props) {
        super(props);
        bindMembersToClass(this, 'onSettingsClick');
        this.isSettingsOpen = !!props.isSettingsOpen
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
        const navbarTitle = boardList.items.length
            && boardList.items.find(b => b.boardID === boardID).short_desc

        // <Icon
        //    name={i.navbarBackwards}
        //  className='MainHeader__backwards' />
        // <Icon
        // name={i.navbarForwards}
        //    className='MainHeader__forwards' />

                // <HeaderGroup className='HeaderGroup__menu-icon'>
                  // <div className="MainHeader__menu-icon">
                    // <SlideDownBG>
                        // <Icon name={i.navbarMenu}/>
                    // </SlideDownBG>
                  // </div>
                // </HeaderGroup>


        return (
            <div className={headerClass}>
              <div className='background' />
              <div className='content'>
                { this.state.isContentInView &&
                    <HeaderGroup className='MainHeader--left HeaderGroup__logo'>
                      <FullLogo className="MainHeader__FullLogo"/>
                    </HeaderGroup>
                }
                <HeaderGroup className='MainHeader--center' onMouseEnter={this.onTitleHover}>
                  <HeaderTitle onClick={this.onTitleClick} className="MainHeader__Title">
                    <span className="title-normal">
                        {!!navbarTitle && navbarTitle}
                    </span>
                    <span className="title-small">
                        {!!navbarTitle && `/${boardID}/`}
                    </span>
                    <Icon name={ this.state.isContentInView
                        ? "chevron-down"
                        : "chevron-up"}/>
                  </HeaderTitle>
                </HeaderGroup>
                { this.state.isContentInView &&
                    <HeaderGroup className='MainHeader--right IconGroup'>
                        <Tooltip className="navtip" content="Thread Watcher" position="bottom" offset="10px">
                            <SlideDownBG>
                              <Notification number={1}>
                                <Icon
                                  name={i.navbarEye}
                                  onClick={() => togglePanel('watch')} />
                              </Notification>
                            </SlideDownBG>
                        </Tooltip>
                        <Tooltip className="navtip" content="Bookmarks" position="bottom">
                            <SlideDownBG>
                              <Icon
                                name={i.navbarBookmark}
                                onClick={() => togglePanel('bookmarks')} />
                            </SlideDownBG>
                        </Tooltip>
                        <Tooltip className="navtip" content="Media Database" position="bottom">
                            <SlideDownBG>
                              <Icon
                                name={i.navbarDB}
                                onClick={() => togglePanel('database')} />
                            </SlideDownBG>
                        </Tooltip>
                        <Tooltip className="navtip" content="Settings" position="bottom">
                            <SlideDownBG>
                              <Icon
                                name={i.navbarSettings}
                                onClick={this.onSettingsClick} />
                            </SlideDownBG>
                        </Tooltip>
                    </HeaderGroup>
                }
              </div>
            </div>
        )
    }

    onSettingsClick(e) {
        logger.log(`MainHeader.Settings - toggling drawer from ${this.isSettingsOpen} to ${!this.isSettingsOpen}`)
        const openDrawer = !this.isSettingsOpen;
        emitSettingsToggle(openDrawer);
        this.isSettingsOpen = openDrawer;
    }

    onTitleClick(e) {
        emitContentViewToggle()
    }

    @onContentViewToggle
    onContentViewToggle() {
        this.setState({
            isContentInView: !this.state.isContentInView
        });
    }

    onTitleHover() {
        // Ensure subheader can be accessed in all scenarios
        emitSubHeaderToggle(true);
    }
}

export default MainHeader;
