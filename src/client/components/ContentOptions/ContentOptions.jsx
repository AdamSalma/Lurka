import React, { Component } from "react";

import classNames from 'classnames';
import uuid from 'uuid';

import Dropdown from '../Dropdown';

export default class ContentOptions extends Component {
    constructor({provider, fetchBoardList}) {
        super()
        fetchBoardList({provider});
        this.onClick = this.onClick.bind(this)
    }

    render() {
        const { provider, fetchBoardList, boardList, isFetching } = this.props;

        const classes = classNames("content-options")  // TODO: add to contentoptions

        return (
            <div id="content-options" className={classes}>
                <Dropdown 
                    className="boardlist" 
                    items={this.createDropdownElements(boardList)} 
                    handleClick={this.onClick}/>
            </div>
        )

    }

    onClick({ target }) {
        const boardID = target.getAttribute('data-value')
        const { provider, fetchBoard } = this.props;
        fetchBoard({boardID, provider})
    } 

    createDropdownElements(boardList){
        return boardList.length ? boardList.map( ({value, text}) => (
            <div key={uuid.v4()} data-value={value}>
                {text}
            </div>
        )) : [];
    }
}