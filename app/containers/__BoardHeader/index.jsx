import React, { Component } from 'react';
import cx from 'classnames';

import './styles';
import {BoardSearch} from '../../components';
import {
    Icon,
    ActionButton,
    Title,
    CircleSpinner,
    ButtonWithPopout
} from '~/components'

const i = Lurka.icons;

class BoardHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { className, onSearch, boardID, boardTitle, isDisabled, isSpinnerActive, ErrorMessage, isActive } = this.props;
        const classes = cx(
            'BoardHeader',
            isDisabled && 'BoardHeader--disabled',
            isActive && 'BoardHeader--animate',
            ErrorMessage && 'BoardHeader--error',
            className
        );

        const props = this.props;

        return (
            <div className={classes}>
                <div className="BoardHeader__title">
                    <Title size={1} weight="light" align="center">
                        {boardTitle && `/${boardID}/ - ${boardTitle}`}
                    </Title>
                </div>
                <div className="BoardHeader__metacontent">
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
                <div className="BoardHeader__subcontents">
                    <div className="BoardHeader__search">
                        <BoardSearch
                            onChange={onSearch}
                            placeholder="Search"
                        />
                    </div>
                    <div className="BoardHeader__btns">
                        <ButtonWithPopout className="BoardHeader__btn"
                          onClick={this.handleSort}
                          popout={<Icon name={i.navbarSort}/>}>
                            <div className="title">Sort by</div>
                        </ButtonWithPopout>
                        <ButtonWithPopout className="BoardHeader__btn"
                          onClick={this.handleFilter}
                          popout={<Icon name={i.navbarFilter}/>}>
                            <div className="title">Filter</div>
                        </ButtonWithPopout>
                        <ButtonWithPopout className="BoardHeader__btn push-left"
                          onClick={this.handleCreateThread}
                          popout={<Icon name={i.navbarNewThread}/>}>
                            <div className="title">Create</div>
                        </ButtonWithPopout>
                        <ButtonWithPopout className="BoardHeader__btn"
                          onClick={this.handleRefreshBoard}
                          popout={<Icon name={i.navbarRefresh}/>}>
                            <div className="title">Refresh</div>
                        </ButtonWithPopout>
                    </div>
                </div>
            </div>
        );
    }

    handleSearch = () => {}
    handleCreateThread = () => {}
    // handleViewArchive = () => {}
    handleRefreshBoard = () => {}
    handleSort = () => {}
    handleFilter = () => {}
}

export default BoardHeader;
