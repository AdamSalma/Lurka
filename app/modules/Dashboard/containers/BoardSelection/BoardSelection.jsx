import React, { Component } from 'react';
import cx from 'classnames';

import './BoardSelection.styles';

import {emitContentViewToggle, emitBoardReset, emitThreadClose} from '~/events/publishers';

class BoardSelection extends Component {
    render() {
        const { boardList, currentBoard } = this.props;
        console.log(boardList, currentBoard);
        return (
            <div className='BoardSelection'>
              { this.renderBoardSelectionTiles() }
            </div>
        )
    }

    renderBoardSelectionTiles = () => {
        const {boardList, currentBoard, fetchBoard} = this.props
        if (!boardList.items || !boardList.items.length ) {
            return false
        }

        return boardList.items.map(({short_desc, boardID, title, info}) => {
           return (
                <BoardListItem
                    key={boardID}
                    onTileClick={this.handleTileClick.bind(null, boardID)}
                    boardID={boardID}
                    className={cx('BoardSelection__Tile', {'is-current': boardID === this.props.currentBoard})}
                    title={title}
                    short_desc={short_desc}
                    NSFW={info.NSFW}
                />
           )
       })
    }

    handleTileClick = (boardID) => {
        emitBoardReset();
        emitThreadClose(emitContentViewToggle)
        this.props.destroyBoard();
        this.props.fetchBoard(boardID);
    }
}


const BoardListItem = ({onTileClick, boardID, className, title, short_desc}) => {

    return (
        <div
          key={boardID}
          onClick={onTileClick}
          className={cx("BoardListItem", className)}>
            <div className="boardID">
                <span className="slash">/</span>{boardID}<span className="slash">/</span>
            </div>
            <div className="title">{title}</div>
            <div className="description">{short_desc}</div>
            <div className="tags">

            </div>
        </div>
    )
}
export default BoardSelection;
