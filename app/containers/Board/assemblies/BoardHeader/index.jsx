import React, { Component } from 'react';
import cx from 'classnames';

import './styles';
import {BoardSearch, BoardMetadata, SortByArea} from '../../components';
import {
    Icon,
    ActionButton,
    Title,
    CircleSpinner,
    ButtonWithPopout,
    HoverUnderline,
    Checkbox,
    Button
} from '~/components'


const i = Lurka.icons;

class BoardHeader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSorting: props.isSorting || false,
            isFiltering: props.isFiltering || false
        }
    }

    render() {
        const {
            className, onSearch,
            boardID, boardTitle,
            isDisabled, isSpinnerActive,
            ErrorMessage, isActive,
            sortBy, onSort,
            onRefresh, onOpenMenu,
            isFavourite, onFavouriteToggle,
            handlePostOpen
        } = this.props;

        const classes = cx(
            'BoardHeader',
            isDisabled && 'BoardHeader--disabled',
            isActive && 'BoardHeader--animate',
            ErrorMessage && 'BoardHeader--error',
            className
        );

        const isFavouriteClasses = cx("meta favourite-board", { "isFavourite": isFavourite })

        const {isSorting, isFiltering} = this.state;

        return (
            <div className={classes}>
                <div className="BoardHeader__title">
                    <Title size={1} weight="normal" align="center" onClick={onOpenMenu}>
                        {boardTitle && boardTitle}
                    </Title>
                </div>
                <div className="BoardHeader__loading">
                    {isSpinnerActive &&
                        <div className="spinner-wrap">
                            <CircleSpinner className="spinner" />
                            <Title size={6} className="spinner-text">Loading </Title>
                        </div>
                    }
                    {ErrorMessage &&
                        <div className="error-wrapper">
                            <Title size={4}>{ErrorMessage}</Title>
                            <div className="error-reload"><Icon name={i.boardHeaderRefresh}/>Try Reloading</div>
                            <div className="error-report"><Icon name={i.boardHeaderReportError}/>Report error</div>
                        </div>
                    }
                </div>
                <div className="BoardHeader__content">
                    <div className="BoardHeader__search">
                        <BoardSearch
                            onChange={onSearch}
                            placeholder="Search"
                        />
                    </div>
                    <div className="BoardHeader__subcontent">
                        <div className="title" onClick={handlePostOpen}>
                            <Icon name={i.plus} className="lower-icon"/>
                            <HoverUnderline children={
                              <span className="new-thread gap-left">New thread</span>
                            }/>
                        </div>
                        <div className="title push-left" onClick={this.toggleSort}>
                            <HoverUnderline>
                                <div>Sort By <Icon name={i.chevronDown}/></div>
                            </HoverUnderline>
                        </div>
                        <div className="title" onClick={this.toggleFilter}>
                            <HoverUnderline>
                                <div>Filter <Icon name={i.chevronDown}/></div>
                            </HoverUnderline>
                        </div>
                    </div>
                </div>
                { isSorting &&
                    <div className="BoardHeader__subarea">
                        {isSorting &&
                            <SortByArea
                                className="BoardHeader__SortByArea"
                                sortBy={sortBy}
                                onSortByBumpOrder={this.handleSortByBumpOrder}
                                onSortByLastReply={this.handleSortByLastReply}
                                onSortByCreationDate={this.handleSortByCreationDate}
                                onSortByReplyCount={this.handleSortByReplyCount}
                                SortingLoader={<CircleSpinner className="SortByArea__Spinner"/>}
                            />
                        }
                    </div>
                }
                {!isSpinnerActive &&
                    <div className="BoardHeader__Metadata">
                        <span className="meta autorefresh"><Button onClick={onRefresh}>Refresh</Button></span>
                        <span className={isFavouriteClasses}><Button onClick={onFavouriteToggle}>Favourite</Button></span>
                    </div>
                }
            </div>
        );
    }

    handleSortByBumpOrder = () => this.onSort("bumporder");
    handleSortByLastReply = () => this.onSort("lastreply");
    handleSortByCreationDate = () => this.onSort("creationdate");
    handleSortByReplyCount = () => this.onSort("replycount");
    onSort = (sortBy) => {
        this.props.onSort(sortBy)
        this.toggleSort()
    }
    handleSearch = () => {}
    // handleCreateThread = () => {}
    // handleViewArchive = () => {}
    // handleRefreshBoard = () => {}
    toggleSort = () => {
        this.setState(state => ({
            isSorting: !state.isSorting
        }))
    }
    toggleFilter = () => {
        this.setState(state => ({
            isFiltering: !state.isFiltering
        }))
    }
}

export default BoardHeader;

                        {/*<ButtonWithPopout className="BoardHeader__btn push-left"
                          onClick={this.toggleSort}
                          popout={<Icon name={i.navbarSort}/>}>
                        </ButtonWithPopout>
                        <ButtonWithPopout className="BoardHeader__btn"
                          onClick={this.toggleFilter}
                          popout={<Icon name={i.navbarFilter}/>}>
                        </ButtonWithPopout>*/}


                    {/*    <ButtonWithPopout className="BoardHeader__btn push-left"
                          onClick={this.handleCreateThread}
                          popout={<Icon name={i.navbarNewThread}/>}>
                            <div className="title">Create</div>
                        </ButtonWithPopout>
                        <ButtonWithPopout className="BoardHeader__btn"
                          onClick={this.handleRefreshBoard}
                          popout={<Icon name={i.navbarRefresh}/>}>
                            <div className="title">Refresh</div>
                        </ButtonWithPopout>*/}
