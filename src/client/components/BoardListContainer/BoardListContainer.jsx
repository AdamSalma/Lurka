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
        this.handleBoardListItemClick = this.handleBoardListItemClick.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.toggleFavourite = this.toggleFavourite.bind(this);

        this.state = {
            searchPhrase: '',
            didSelectOption: false,
            dropdownOption: {}
        }
    }

    render() {
        const BLclasses = classNames('boardlists', this.props.className)
        return (
            <div className={BLclasses}>
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
                {this.renderDescription()}
            </div>
        )
    }

    renderDescription() {
        const { boardList, status:{ providers }} = this.props
        const { didSelectOption, dropdownOption:{ boardID, provider }} = this.state
        const remaining = providers.filter( provider => {
            return !(boardList[provider] && boardList[provider].length)
        })

        if (remaining.length) 
            return false

        if (didSelectOption) {
            const board = boardList[provider].find( el => el.boardID === boardID)

            if (!board) {
                console.error(boardList)
                console.error(boardList[provider])
                throw new Error(`Board was undefined: ${provider}/${boardID}`)
            }

            return (
                <div className="description">
                    <h2 className="title">/{board.title}/</h2>
                    <p dangerouslySetInnerHTML={{ __html: board.description }} />
                    <input 
                        type="button" 
                        value={`Lurk ${board.url}`} 
                        onClick={this.handleButtonClick.bind(null, provider, boardID)}
                    />
                </div>
            )
        } else {
            // Boardlists finished loading. Waiting for user input
            return (
                <div className="description">
                    <h3 className="title select">Select a board</h3>
                </div>
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
                boardListElements={this.getBoardListElements(provider)}
                boardList={boardList[provider]}
                onClick={ event => this.handleBoardListItemClick(event, provider)}
                fetchBoardList={fetchBoardList}
                key={provider}
            />
        )
    }

    handleKeyUp(event) {
        const searchPhrase = event.target.value.toLowerCase()
        this.setState({searchPhrase})
    }

    handleBoardListItemClick(event, provider) {
        const boardID = event.target.getAttribute('data-value');
        this.setState({
            didSelectOption: true,
            dropdownOption: {
                boardID,
                provider
            }
        })
    }

    handleButtonClick(provider, boardID) {
        const {scrollPage, scrollHeader, changeProvider, fetchBoard} = this.props;

        changeProvider(provider)
        fetchBoard({boardID, provider})
        scrollHeader(true, 600)
        scrollPage({
            page: "board", 
            direction: "up"
        })
    }

    getBoardListElements( provider ) {
        // Filter boardlist then render each board
        const { boardList } = this.props
        const { searchPhrase } = this.state

        if (!boardList[provider]) return [];

        return boardList[provider].filter( 
            // filter by searchword
            board => board.description.toLowerCase().includes(searchPhrase)
        ).map( ({boardID, short_desc}, index) => {
            // Create each element

            const isFavourite = this.isFavourite(provider, boardID)

            const star = classNames('mdi', 'clearfix', {
                'mdi-star': isFavourite,
                'mdi-star-outline': !isFavourite
            })

            return (
                <div 
                    key={uuid.v4()} 
                    data-value={boardID} 
                    data-index={index}
                >
                    <Icon 
                        className={star} 
                        onClick={
                            event => this.toggleFavourite(event, provider, boardID)
                        }
                    />
                    {short_desc}
                </div>
            )
        })
    }

    toggleFavourite(event, provider, boardID) {
        // check if board is in favourites
        event.stopPropagation()
        if (this.isFavourite(provider, boardID)) {
            console.log(`removeFromFavourites() ${provider} ${boardID}`)
            this.props.removeFromFavourites(provider, boardID)
        } else {
            console.log(`addToFavourites() ${provider} ${boardID}`)
            this.props.addToFavourites(provider, boardID)
        }
        // this.forceUpdate()

    }

    isFavourite(provider, boardID) {
        // check if board is in favourites. Return bool
        return !!this.props.boardList['favourites'].find(board => board.boardID === boardID)

    }
}
