import './BoardList.styles'

import React, { Component } from "react";
import classes from 'classnames';
import uuid from 'uuid';

import Dropdown from '../Dropdown';
import Icon from '../Icon';

export default class BoardList extends Component {
    constructor({shouldPreload, boardList, provider, fetchBoardList}) {
        super()

        if (shouldPreload && !boardList) {
            fetchBoardList(provider);
        }
    }

    render() {
        const {boardList, provider, onClick, boardListElements} = this.props
        const boardlistClasses = classes('Boardlist', `p-${provider}`)
        const hasBoards = boardListElements && boardListElements.length;

        return (
            <div className={boardlistClasses}>
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
