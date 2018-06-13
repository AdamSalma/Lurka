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
    SlideDownBG,
    VerticallyTitledIcon as TitledIcon
} from '../../components';

/* Generic Components */
import {
    SearchBar,
    Icon,
    Notification,
    Tooltip,
    FullLogo
} from '~/components/UI';

/* Events */
import {
  emitContentViewToggle,
  emitSubHeaderToggle,
  emitSettingsToggle,
  emitOpenHeaderPanel,
  emitHeaderToggled,
  emitBoardReset,
  onContentViewToggle,
  onHeaderShrink,
  onHeaderExpand,
  onHeaderPanelOpened,
  onHeaderPanelClosed,
  emitPostToggle
} from "~/events";

/* Helpers */
import { bindMembersToClass } from '~/utils/react';
import SubHeader from '../SubHeader/SubHeader';

const i = Lurka.icons;
const headerToggleDuration = 200



const ButtonIndent = ({ className, children, isActive, ...restProps }) => {
    return (
        <div className={cx('ButtonIndent', className, { "is-active": isActive })} {...restProps}>
            {children}
        </div>
    );
};

ButtonIndent.displayName = 'ButtonIndent';





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
            isToggling: false,
            panelID: null
        }
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

    @onContentViewToggle
    onContentViewToggle() {
        this.setState({
            isContentInView: !this.state.isContentInView
        });
    }

    @onHeaderPanelOpened
    onHeaderPanelOpened(panelID) {
        this.setState({ panelID })
    }

    @onHeaderPanelClosed
    onHeaderPanelClosed(panelID) {
        this.setState({ panelID: null })
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.state.isExpanded !== prevState.isExpanded) {
            emitHeaderToggled(this.state.isExpanded);
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
            boardList,
            boardStats
        } = this.props

        const {isExpanded} = this.state

        const headerClass = cx('DynamicHeader', {
            // 'drawer-open': isDrawerOpen,
            'shrink': !isExpanded,
        });

        // TODO: Use selector for this:
        const navbarTitle = boardID && boardList.items.length
            && boardList.items.find(b => b.boardID === boardID).short_desc

        console.warn("PanelID: ", this.state.panelID)
        // <Icon
        //    name={i.navbarBackwards}
        //  className='DynamicHeader__backwards' />
        // <Icon
        // name={i.navbarForwards}
        //    className='DynamicHeader__forwards' />



        return (
            <div>
            <div className={headerClass}>
              <div className='background' />
              <div className='content'>
                <HeaderGroup className='left'>

                  <HeaderButton
                    className="menu"
                    onClick={this.toggleMenuPanel}
                    icon={i.navbarMenu}
                    title="Menu"
                    isActive={this.state.panelID === "menu"}
                  />
                  {/* <div className="header-button" onClick={this.toggleMenuPanel}>
                    <div className="header-button-content">
                    <Icon name={i.navbarMenu}/>
                    <div className="header-button-title">Menu</div>
                    </div>
                </div> */}

                  <FullLogo/>
                  {/* <Icon name={i.navbarChevron}/> */}
                  {/* <Icon className="board-action first" name="mode_edit"/> */}
                  {/* <Icon className="board-action" name="reload"/> */}
                </HeaderGroup>

                <HeaderGroup className='center' onMouseEnter={this.onTitleHover}>

                  {/* <ButtonIndent className="hide-on-expanded">
                    <div className="shrink-icon shrink-icon-left" >
                    <Icon name={i.navbarNewThread}/>
                    </div>
                </ButtonIndent> */}

                  {/* <ButtonIndent className="HeaderTitle--wrapper">
                  { !isExpanded &&
                        <HeaderTitle onClick={this.onTitleClick} className="main-title">
                        {!!navbarTitle && <span className="title-normal">{navbarTitle}</span>}
                        {!!navbarTitle && <span className="title-small">/{boardID}/</span>}
                        {!!navbarTitle && <Icon name={i.navbarChevron}/>}
                        </HeaderTitle>
                    // <div className="title-group">
                    //     { Stats:

                    //     <div>
                    //     <span className="stat replies">replies: {boardStats.replies}</span>
                    //     <span className="stat images">images: {boardStats.images}</span>
                    //     </div>
                    //     }
                    // </div>
                  }
                  </ButtonIndent> */}

                  {/* <ButtonIndent onClick={this.refreshBoard} className="hide-on-expanded">
                    <div className="shrink-icon shrink-icon-right" >
                    <Icon name={i.navbarRefresh}/>
                    </div>
                </ButtonIndent> */}

                </HeaderGroup>

                <HeaderGroup className='right'>
                    <HeaderButton
                        onClick={this.togglePostPanel}
                        icon="mode_edit"
                        title="Create"
                        isActive={this.state.panelID === "create"}
                    />
                    {/* <ButtonIndent onClick={this.toggleWatchPanel} isActive={this.state.panelID === "create"}>
                        <div className="vertical-icon" >
                            <div>
                              <Icon name="mode_edit"/>
                            <span className="title">Create</span>
                            </div>
                        </div>
                    </ButtonIndent> */}
                    <HeaderButton
                        onClick={this.toggleWatchPanel}
                        icon={i.navbarEye}
                        title="Watcher"
                        isActive={this.state.panelID === "watcher"}
                    />
                </HeaderGroup>
              </div>
            </div>
                <SubHeader navbarTitle={navbarTitle} boardID={boardID} threadID={threadID}/>
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

        // emitContentViewToggle()
        this.scrollToSearchbar()
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
    toggleMenuPanel = () => this.togglePanel("menu");
    togglePostPanel = () => {
        emitPostToggle({ context: "board" });
    }

    refreshBoard = () => {
        emitBoardReset(0); // duration=0
        this.props.fetchBoard(this.props.boardID);
    }

    scrollToSearchbar = (duration=600) => {
        emitBoardReset(duration);
    }

}

export default DynamicHeader;

export const HeaderButton = ({ onClick, icon, title, isActive, className }) => {
    return <div className={cx("header-button", isActive && "active", className)} onClick={onClick}>
        <div className="header-button-content">
          <Icon name={icon} />
          <div className="header-button-title">{title}</div>
        </div>
      </div>;
}


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
