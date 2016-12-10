import React, { Component } from "react";

import classNames from 'classnames';
import uuid from 'uuid';

import Icon from '../Icon';
import BoardList from '../BoardList';
import SearchBox from '../SearchBox';

export default class BoardLists extends Component {
    constructor(props) {
        super(props);
        this.handleKeyUp = this.handleKeyUp.bind(this);

        this.state = {
            searchPhrase: ''
        }
    }

    render() {
        return (
            <div className="boardlists">
                <div className="boards">
                    <div className="searchbar">
                        <Icon className="mdi mdi-arrow-left"/>
                        <SearchBox 
                            onKeyUp={this.handleKeyUp} 
                            placeholder={`Search...`}
                        />
                        <Icon className="mdi mdi-magnify"/>
                    </div>
                    {this.renderBoardLists()}
                </div>
                <div className="description">
                    {this.renderDescription()}
                </div>
            </div>
        )
    }

    renderDescription() {
        const {boardList, status: {providers}} = this.props
        const remaining = providers.filter( provider => {
            return !(boardList[provider] && boardList[provider].length)
        })

        if (!remaining.length) {
            return (
                <h3>Select a lurk zone</h3>
            )
        }
    }

    renderBoardLists() {
        const { fetchBoardList, boardList, status:{ providers } } = this.props;
        const { searchPhrase } = this.state

        return providers.map( provider => 
            <BoardList 
                shouldPreload={true}
                searchPhrase={searchPhrase}
                provider={provider} 
                boardList={boardList[provider]}
                fetchBoardList={fetchBoardList}
                onClick={ event => this.handleClick(event, provider)}
                key={provider}
            />
        )
    }

    handleKeyUp(event) {
        const searchPhrase = event.target.value.toLowerCase()
        this.setState({searchPhrase})
    }

    handleClick(event, provider) {
        const {scrollPage, scrollHeader, changeProvider, fetchBoard} = this.props;
        const boardID = event.target.getAttribute('data-value');

        changeProvider(provider)
        scrollPage("content", true)  // true = "show" content page
        fetchBoard({boardID, provider})
    }
}
