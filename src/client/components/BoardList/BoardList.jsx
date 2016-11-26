import React, { Component } from "react";

import classNames from 'classnames';
import uuid from 'uuid';

import Dropdown from '../Dropdown';

export default class BoardList extends Component {
    constructor({boardList, provider, fetchBoardList}) {
        super()
        this.renderBoardListIfExists = this.renderBoardListIfExists.bind(this)

        if (!boardList) {
            fetchBoardList(provider);
        }
    }

    render() {
        const classes = classNames("board-list")  // TODO: add to boardlist

        return (
            <div className={classes}>
                {this.renderBoardListIfExists()}
            </div>
        )
    }

    renderBoardListIfExists() {
        const { boardList, provider, handleClick } = this.props;

        if (boardList && boardList.length) {
            return <Dropdown 
                className={`boardList ${provider}`}
                items={this.renderDropdownChildren(boardList)}
                handleClick={handleClick}
            />
        } 
    }

    renderDropdownChildren(boardList) {
        return boardList.map( ({boardID, description}) => (
            <div key={uuid.v4()} data-value={boardID}>
                {description}
            </div>
        ));
    }
}