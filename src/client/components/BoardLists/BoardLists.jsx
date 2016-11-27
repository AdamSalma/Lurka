import React, { Component } from "react";

import classNames from 'classnames';
import uuid from 'uuid';

import BoardList from '../BoardList';

export default class BoardLists extends Component {
    constructor({boardList, provider, fetchBoardList}) {
        super()
        this.onBoardListClick = this.onBoardListClick.bind(this);
        this.renderProviders = this.renderProviders.bind(this);

        if (!boardList) {
            fetchBoardList(provider);
        }
    }

    render() {
        return (
            <section className="board-lists">
                <h3>Choose your provider:</h3>
                <button onClick={this.props.scrollPage.bind(null, "content", true)}>SCROLL</button>
                <div className="board-lists-wrap">
                    {this.renderProviders()}
                </div>
            </section>
        )
    }

    renderProviders() {
        const { fetchBoardList, status, boardList } = this.props;
        const { providers } = status;

        return providers.map( provider => {
            return (
                <BoardList 
                    provider={provider} 
                    boardList={boardList[provider]}
                    fetchBoardList={fetchBoardList}
                    handleClick={ event => this.onBoardListClick(event, provider)}
                    key={provider}
                />
            )
        })
    }

    onBoardListClick(event, provider) {
        const {scrollPage, changeProvider, fetchBoard} = this.props;
        const boardID = event.target.getAttribute('data-value');

        changeProvider(provider)
        scrollPage("content", true)
        fetchBoard({boardID, provider})  // auto sets board
    }
}