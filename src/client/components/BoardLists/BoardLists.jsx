import React, { Component } from "react";

import classNames from 'classnames';
import uuid from 'uuid';

import BoardList from '../BoardList';

export default class BoardLists extends Component {
    constructor() {
        super()
        this.onBoardListClick = this.onBoardListClick.bind(this);
        this.renderProviders = this.renderProviders.bind(this);
    }

    render() {
        return (
            <section className="board-lists">
                <h3>Choose your provider:</h3>
                <button onClick={this.props.scrollPage.bind(null, "content", true)}>SCROLL</button>
                <div className="board-lists-wrap">
                    {this.renderProviders()}
                </div>
                <div className="favourites">
                    {this.renderFavourites()}
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
                    shouldPreload={true}
                    fetchBoardList={fetchBoardList}
                    handleClick={ event => this.onBoardListClick(event, provider)}
                    key={provider}
                />
            )
        })
    }

    renderFavourites(){
        const { boardList } = this.props, provider = "favourites";

        return (
            <BoardList 
                provider={provider} 
                boardList={boardList[provider]}
                shouldPreload={false}
                handleClick={ event => this.onBoardListClick(event, provider)}
            />
        )
    }
    onBoardListClick(event, provider) {
        const {scrollPage, scrollHeader, changeProvider, fetchBoard} = this.props;
        const boardID = event.target.getAttribute('data-value');

        changeProvider(provider)
        scrollPage("content", true)
        scrollHeader(true)
        fetchBoard({boardID, provider})  // auto sets board
    }
}