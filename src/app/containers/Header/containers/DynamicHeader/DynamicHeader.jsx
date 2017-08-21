import './DynamicHeader.styles';
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

const i = window.appSettings.icons;
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


                  <div className="shrink-icon shrink-icon-right">
                    <Icon name={i.navbarArchive}/>
                  </div>

                  <div className="shrink-icon shrink-icon-left">
                    <Icon name={i.navbarNewThread}/>
                  </div>

                  <HeaderTitle onClick={this.onTitleClick} className="main-title">
                    <span className="title-normal">
                        {!!navbarTitle && navbarTitle}
                    </span>
                    <span className="title-small">
                        {!!navbarTitle && `/${boardID}/`}
                    </span>
                    <Icon name={i.navbarChevron}/>
                  </HeaderTitle>


                  <div className="shrink-icon shrink-icon-right" onClick={this.refreshBoard}>
                      <Icon name={i.navbarRefresh}/>
                  </div>

                  <div className="shrink-icon shrink-icon-left" onClick={this.scrollToSearchbar}>
                    <Icon name={i.navbarSearch}/>
                  </div>

                </HeaderGroup>
                <HeaderGroup className='right'>
                    <div className="vertical-icon" onClick={() => this.openPanel("watcher")}>
                        <Notification number={1}>
                          <Icon name={i.navbarEye}/>
                        </Notification>
                        <span className="title">Watcher</span>
                    </div>

                    <div className="vertical-icon" onClick={() => this.openPanel("bookmarks")}>
                        <Icon name={i.navbarBookmark}/>
                        <span className="title">Bookmarks</span>
                    </div>

                    <div className="vertical-icon" onClick={() => this.openPanel("bookmarks")}>
                        <Icon name={i.navbarDownloads}/>
                        <span className="title">Downloads</span>
                    </div>

                    <div className="vertical-icon" onClick={() => this.openPanel("bookmarks")}>
                        <Icon name={i.navbarSettings}/>
                        <span className="title">Settings</span>
                    </div>
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

    openPanel(panelID) {
        emitOpenHeaderPanel({panelID, closeIfOpen: true})
    }

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
