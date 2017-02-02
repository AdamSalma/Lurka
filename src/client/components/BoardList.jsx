import React, { Component } from "react";

import classNames from 'classnames';
import uuid from 'uuid';

import Dropdown from './Dropdown';
import Icon from './Icon';

export default class BoardList extends Component {
    constructor({shouldPreload, boardList, provider, fetchBoardList}) {
        super()

        if (shouldPreload && !boardList) {
            fetchBoardList(provider);
        }
    }

    render() {
        const {boardList, provider, onClick, boardListElements} = this.props
        const classes = classNames('boardlist', `p-${provider}`)
        const hasBoards = boardListElements && boardListElements.length;

        return (
            <div className={classes}>
                {hasBoards ? <Dropdown 
                    onClick={onClick} 
                    items={boardListElements} 
                    scrollOpts={{sliderMinHeight: 50, alwaysVisible: true}}
                /> : false}
            </div>
        )
    }
}

BoardList.defaultProps = {
    searchPhrase: '',
    shouldPreload: true
}
