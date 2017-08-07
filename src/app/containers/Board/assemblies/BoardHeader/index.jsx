import React, { Component } from 'react';
import cx from 'classnames';

import './styles';
import {ActionButton} from '../../components';

class BoardHeader extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { className } = this.props;
        return (
            <div className={cx('BoardHeader', className)}>
                <div className="BoardHeader__search">
                    <SearchBarWithIcons onChange={this.handleSearch}/>
                </div>
                <div className="BoardHeader__actions">
                <ActionButton onClick={this.handleCreateThread}>
                    <Icon name={i.navbarNewThread}/>
                    <div className="title">Create Thread</div>
                </ActionButton>
                <ActionButton onClick={this.handleViewArchive}>
                    <Icon name={i.navbarArchive}/>
                    <div className="title">View Archive</div>
                </ActionButton>
                <ActionButton onClick={this.handleRefreshBoard}>
                    <Icon name={i.navbarRefresh}/>
                    <div className="title">Refresh Board</div>
                </ActionButton>
                <ActionButton onClick={this.handleSort}>
                    <Icon name={i.navbarSort}/>
                    <div className="title">Sort by</div>
                </ActionButton>
                <ActionButton onClick={this.handleFilter}>
                    <Icon name={i.navbarFilter}/>
                    <div className="title">Filters</div>
                </ActionButton>
                </div>
            </div>
        );
    }

    handleOnChange = () => {}
}

export default BoardHeader;
