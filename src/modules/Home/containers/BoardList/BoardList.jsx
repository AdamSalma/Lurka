import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import './BoardList.styles';
import {
    ScrollableList,
    BoardListItem
} from '../../components';

import {
    bindMembersToClass
} from '~/utils/react';

class BoardList extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };

        bindMembersToClass(this, 'renderListItems', 'handleItemClick');
    }

    render() {
        const { className, orderedBoards } = this.props;
        return (
            <div className={cx('BoardList', className)}>
                <ScrollableList className="BoardList__ScrollList">
                    {this.renderListItems()}
                </ScrollableList>
            </div>
        )
    }

    renderListItems() {
        return this.props.orderedBoards.map( board => {
            return (
                <BoardListItem
                    className="BoardList__ScrollItem"
                    title={board.url}
                    description={board.title}
                    info={board.info}
                    onClick={this.handleItemClick.bind(null, board.boardID)}
                />
            );
        });
    }

    handleItemClick(boardID) {
        this.props.fetchBoard(boardID)
    }
}

export default BoardList;
