import {DragSource} from 'react-dnd'
import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

import './BoardSelection.styles';

import {emitContentViewToggle, emitBoardReset} from '~/events/publishers';
import {bindMembersToClass} from '~/utils/react';

class BoardSelection extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.renderBoardSelectionTiles = this.renderBoardSelectionTiles.bind(this);
        bindMembersToClass(this, 'handleTileClick');
    }

    render() {
        const { boardList, currentBoard } = this.props;
        console.log(boardList, currentBoard);
        return (
            <div className='BoardSelection'>
              { this.renderBoardSelectionTiles() }
            </div>
        )
    }

    renderBoardSelectionTiles() {
        const {boardList, currentBoard, fetchBoard} = this.props
        if (!boardList.items || !boardList.items.length ) {
            return false
        }

        return boardList.items.map(({short_desc, boardID, title}) => {
           return (
                <BoardListItem
                    key={boardID}
                    onTileClick={this.handleTileClick.bind(null, boardID)}
                    boardID={boardID}
                    className={cx('BoardSelection__Tile', {'is-current': boardID === this.props.currentBoard})}
                    title={title}
                    short_desc={short_desc}
                />
           )
       })
    }

    handleTileClick(boardID) {
        emitBoardReset();
        emitContentViewToggle();
        this.props.destroyBoard();
        this.props.fetchBoard(boardID);
    }
}


@DragSource("BoardListItem", {beginDrag: (props) => props}, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))
class BoardListItem extends Component {
    render() {
        const { isDropped, isDragging, connectDragSource } = this.props;
        const { onTileClick, boardID, className, title, short_desc } = this.props;

        return connectDragSource(
            <div
              key={boardID}
              onClick={onTileClick}
              className={cx("BoardListItem", className)}>
                <div className="boardID">/{boardID}/</div>
                <div className="title">{title}</div>
                <div className="description">{short_desc}</div>
            </div>
        )
    }
}
export default BoardSelection;
