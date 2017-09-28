import './DynamicHeader.styles';
import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';
import {MdMenu, MdKeyboardArrowDown, MdFileDownload} from 'react-icons/lib/md';
// import {GoArrowDown} from 'react-icons/lib/go';
import {IoArrowDownA} from 'react-icons/lib/io';


/* Header Specific components */
import {
    IconGroup,
    HeaderTitle,
    HeaderGroup,
    BoardSpecs,
    ContentButtonGroup,
    FullLogo,
    SlideDownBG,
    VerticallyTitledIcon as TitledIcon
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
    emitSettingsToggle,
    emitOpenHeaderPanel,
    emitBoardReset,
    onContentViewToggle,
    onHeaderShrink,
    onHeaderExpand,
} from '~/events';

/* Helpers */
import { bindMembersToClass } from '~/utils/react';

const i = Lurka.icons;
const headerToggleDuration = 200


class DynamicHeader extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        bindMembersToClass(this, 'onSettingsClick');
        this.isSettingsOpen = !!props.isSettingsOpen
        this.state = {
            isContentInView: true,
            isExpanded: true,
            isToggling: false
        }
    }

    render() {
        // const {
        //     // Actions
        //     //State
        //     scrollHeader, closeThread, toggleDynamicHeader,

        // } = this.props;

        const {
            // Actions
            toggleContentNav,
            cycleContentNav,
            toggleDrawer,
            togglePanel,
            fetchBoard,
            // State
            boardID,
            threadID,
            isDrawerOpen,
            boardList
        } = this.props

        const headerClass = cx('DynamicHeader', {
            // 'drawer-open': isDrawerOpen,
            'shrink': !this.state.isExpanded,
        });

        // TODO: Use selector for this:
        const navbarTitle = boardID && boardList.items.length
            && boardList.items.find(b => b.boardID === boardID).short_desc

        // <Icon
        //    name={i.navbarBackwards}
        //  className='DynamicHeader__backwards' />
        // <Icon
        // name={i.navbarForwards}
        //    className='DynamicHeader__forwards' />

                // <HeaderGroup className='HeaderGroup__menu-icon'>
                  // <div className="DynamicHeader__menu-icon">
                    // <SlideDownBG>
                        // <Icon name={i.navbarMenu}/>
                    // </SlideDownBG>
                  // </div>
                // </HeaderGroup>


        return (
            <div className={headerClass}>
              <div className='background' />
              <div className='content'>
                <HeaderGroup className='left'>
                  <FullLogo className="DynamicHeader__FullLogo"/>
                </HeaderGroup>
                <HeaderGroup className='center' onMouseEnter={this.onTitleHover}>

                  <SlideDownBG className="hide-on-expanded">
                    <div className="shrink-icon shrink-icon-left" >
                    <Icon name={i.navbarNewThread}/>
                    </div>
                  </SlideDownBG>

                  <SlideDownBG className="HeaderTitle--wrapper">
                  <HeaderTitle onClick={this.onTitleClick} className="main-title">
                    {!!navbarTitle && <span className="title-normal">{navbarTitle}</span>}
                    {!!navbarTitle && <span className="title-small">/{boardID}/</span>}
                    {!!navbarTitle && <MdKeyboardArrowDown color="#777"/>}
                  </HeaderTitle>
                  </SlideDownBG>

                  <SlideDownBG onClick={this.refreshBoard} className="hide-on-expanded">
                    <div className="shrink-icon shrink-icon-right" >
                      <Icon name={i.navbarRefresh}/>
                    </div>
                  </SlideDownBG>

                </HeaderGroup>
                <HeaderGroup className='right'>
                    <SlideDownBG onClick={this.toggleWatchPanel}>
                        <div className="vertical-icon" >
                            <Notification number={1}>
                              <Icon name={i.navbarEye}/>
                            </Notification>
                            <span className="title">Watcher</span>
                        </div>
                    </SlideDownBG>

                    <SlideDownBG onClick={this.toggleBookmarkPanel}>
                        <div className="vertical-icon" >
                            <Icon name={i.navbarBookmark}/>
                            <span className="title">Bookmarks</span>
                        </div>
                    </SlideDownBG>

                    <SlideDownBG onClick={this.toggleDownloadsPanel}>
                        <div className="vertical-icon" >
                            <IoArrowDownA/>
                            <span className="title">Downloads</span>
                        </div>
                    </SlideDownBG>

                    <SlideDownBG onClick={this.toggleSettingsPanel}>
                        <div className="vertical-icon" >
                            <Icon name={i.navbarSettings}/>
                            <span className="title">Settings</span>
                        </div>
                    </SlideDownBG>
                </HeaderGroup>
              </div>
            </div>
        )
    }

    onSettingsClick(e) {
        logger.log(`DynamicHeader.Settings - toggling drawer from ${this.isSettingsOpen} to ${!this.isSettingsOpen}`)
        const openDrawer = !this.isSettingsOpen;
        emitSettingsToggle(openDrawer);
        this.isSettingsOpen = openDrawer;
    }

    onTitleClick = (e) => {
        // this.state.isExpanded
        //     ? this.onHeaderShrink()
        //     : this.onHeaderExpand()

        emitContentViewToggle()
    }

    @onContentViewToggle
    onContentViewToggle() {
        this.setState({
            isContentInView: !this.state.isContentInView
        });
    }

    @onHeaderShrink
    onHeaderShrink = () => {
        if (this.state.isExpanded) {
            this.setState(
                { isExpanded: false, isToggling: true },
                () => setTimeout(this.toggleComplete, headerToggleDuration)
            );
        }
    }

    @onHeaderExpand
    onHeaderExpand = () => {
        if (!this.state.isExpanded) {
            this.setState(
                { isExpanded: true, isToggling: true },
                () => setTimeout(this.toggleComplete, headerToggleDuration)
            );
        }
    }

    toggleComplete = () => {
        this.setState({ isToggling: false })
    }

    togglePanel(panelID) {
        emitOpenHeaderPanel({panelID, closeIfOpen: true})
    }

    toggleWatchPanel = () => this.togglePanel("watcher");
    toggleBookmarkPanel = () => this.togglePanel("bookmarks");
    toggleDownloadsPanel = () => this.togglePanel("downloads");
    toggleSettingsPanel = () => this.togglePanel("settings");

    refreshBoard = () => {
        emitBoardReset(0); // duration=0
        this.props.fetchBoard(this.props.boardID);
    }

    scrollToSearchbar = () => {
        emitBoardReset(600); // duration=0
    }

}

export default DynamicHeader;



/*

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


 */
