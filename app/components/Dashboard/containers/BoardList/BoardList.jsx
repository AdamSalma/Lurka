import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import './BoardList.styles';
import {ScrollableList} from '~/components/UI'
import {
    BoardListItem
} from '../../components';

import {
    bindMembersToClass
} from '~/utils/react';



import {DropTarget} from "react-dnd";

const dustbinTarget = {
  drop(props, monitor, component) {
    component.onDrop(monitor.getItem());
  },
};

@DropTarget("BoardListItem", dustbinTarget, (connect, monitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
    hoverItem: monitor.isOver() && monitor.getItem(),
    isDragging: monitor.getItemType() === "BoardListItem",
    dragOffset: monitor.getClientOffset,
    x: (() => console.info(monitor))(),
}))


class BoardList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        };
    }

    onDrop(item) {
        this.props.addBoardToFavourites(item.boardID);
        this.lastDroppedItem = item;
    }

    render() {
        const { className, orderedBoards, favouriteBoards } = this.props;
        const { dragOffset, connectDropTarget, isOver, lastDroppedItem, hoverItem, isDragging, } = this.props;

        return connectDropTarget(
            <div className={cx('BoardList', className)}>
                {isDragging && !isOver && "DROP HERE"  /* Some sort of drop overlay component */}
                <div>{ isOver ? (
                        this.renderListItems([hoverItem])
                    ) : this.renderListItems(favouriteBoards)}
                </div>
            </div>
        )
    }
                // <ScrollableList className="BoardList__ScrollList">
                //     {this.renderListItems()}
                // </ScrollableList>

    renderListItems = (orderedBoards) => {
        // return this.props.orderedBoards.map( board => {
        return orderedBoards.map( board => {
            return (
                <BoardListItem
                    key={board.boardID}
                    className="BoardList__ScrollItem"
                    title={board.url}
                    description={board.title}
                    info={board.info}
                    onClick={this.handleItemClick.bind(null, board.boardID)}
                />
            );
        });
    }

    handleItemClick = (boardID) => {
        this.props.fetchBoard(boardID)
    }
}

export default BoardList;
