import React, { Component } from "react";

import classNames from 'classnames';
import uuid from 'uuid';

import Dropdown from '../Dropdown';

export default class BoardList extends Component {
    constructor({shouldPreload, boardList, provider, fetchBoardList}) {
        super()

        if (shouldPreload && !boardList) {
            fetchBoardList(provider);
        }
    }

    render() {
        const {boardList, provider, onClick} = this.props
        const classes = classNames('boardlist', `p-${provider}`)
        const hasBoards = boardList && boardList.length;

        return (
            <div className={classes}>
                {hasBoards && <Dropdown 
                    onClick={onClick} 
                    items={this.dropdownItems(boardList)} 
                />}
            </div>
        )
    }

    dropdownItems(boardList) {
        // Filter boardlist then render each board

        return boardList.filter( ({description}) => 
            description.toLowerCase()
                .includes(this.props.searchPhrase)
        ).map( 
            ({boardID, description}, index) => (
                <div 
                    key={uuid.v4()} 
                    data-value={boardID} 
                    data-index={index}
                >{description}</div>
            )
        )
    }

}

BoardList.defaultProps = {
    searchPhrase: '',
    shouldPreload: true
}
