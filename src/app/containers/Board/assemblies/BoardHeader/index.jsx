import React, { Component } from 'react';
import cx from 'classnames';

import './styles';
import {ActionButton, BoardSearch} from '../../components';
import {Icon} from '~/components'

const i = window.appSettings.icons;

class BoardHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { className, onSearch } = this.props;

        return (
            <div className={cx('BoardHeader', className)}>
                <div className="BoardHeader__search">
                    <BoardSearch
                        onChange={onSearch}
                        placeholder="Search"
                    />
                </div>
                <div className="BoardHeader__actions">
                    <ActionButton onClick={this.handleCreateThread}>
                        <Icon name={i.navbarNewThread}/>
                        <div className="title">Create</div>
                    </ActionButton>
                    <ActionButton onClick={this.handleViewArchive}>
                        <Icon name={i.navbarArchive}/>
                        <div className="title">Archive</div>
                    </ActionButton>
                    <ActionButton onClick={this.handleRefreshBoard}>
                        <Icon name={i.navbarRefresh}/>
                        <div className="title">Refresh</div>
                    </ActionButton>
                    <ActionButton onClick={this.handleSort}>
                        <Icon name={i.navbarSort}/>
                        <div className="title">Sort by</div>
                    </ActionButton>
                    <ActionButton onClick={this.handleFilter}>
                        <Icon name={i.navbarFilter}/>
                        <div className="title">Filter</div>
                    </ActionButton>
                </div>
            </div>
        );
    }

    handleSearch = () => {}
    handleCreateThread = () => {}
    handleViewArchive = () => {}
    handleRefreshBoard = () => {}
    handleSort = () => {}
    handleFilter = () => {}
}

export default BoardHeader;
