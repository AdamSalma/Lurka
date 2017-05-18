import './BoardSelection.styles';
import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import {emitContentViewToggle} from '~/events/publishers';

class BoardSelection extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.renderBoardSelectionTiles = this.renderBoardSelectionTiles.bind(this);
    }

    render() {
        const {boardList, currentBoard} = this.props;
        console.log(boardList, currentBoard);
        return (
            <div className='BoardSelection'>
              { this.renderBoardSelectionTiles() }
            </div>
        )
    }

    renderBoardSelectionTiles() {
        const {boardList, currentBoard} = this.props
        if (!boardList.items || !boardList.items.length ) {
            return false
        }

        return boardList.items.map(({short_desc, boardID, title}) => {
           return (
               <div
                 key={boardID}
                 className={cx('BoardSelection__Tile', {
                    'is-current': boardID === this.props.currentBoard
                 })}>
                     <div className="boardID">/{boardID}/</div>
                     <div className="title">{title}</div>
                     <div className="description">{short_desc}</div>
               </div>
           )
       })
    }
}

export default BoardSelection;
