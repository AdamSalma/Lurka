import React, { Component } from 'react';
import cx from 'classnames';

import connect from './connect';
import { Icon, Button, SearchBarWithIcons, Line } from '~/components/UI';
import { MenuPage } from '../../components';
import BoardListItem from './BoardListItem';
import './styles';
import { emitCloseHeaderPanel, emitThreadClose, emitHeaderExpand } from '~/events';


export class BoardListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchPhrase: "",
            favouritesOnly: false,
            adultOnly: false
        }
    }

    render() {
        const { boardList } = this.props;
        const BoardList = this.renderBoardList(boardList)

        return (
            <MenuPage title="Boards" className="BoardListPage">
                <SearchBarWithIcons placeholder="keywords, title..." className="search" onChange={this.handleSearch}/>
                <div className="toggle-buttons">
                    <Button onClick={this.toggleAdultBoards}>18+</Button>
                    <Button onClick={this.toggleFavouriteBoards}>Favourites</Button>
                </div>
                <div className="metadata">
                    <div className="board-count"><span>{BoardList.length}</span> / {boardList.length}</div>
                    <div className="note">Right click for options</div>
                </div>
                <Line />
                <div className="BoardList">
                    {BoardList}
                </div>
            </MenuPage>
        );
    }

    handleSearch = searchPhrase => {
        console.error(searchPhrase)
        this.setState({ searchPhrase });
    }

    renderBoardList( boardList ) {
        const { fetchBoard } = this.props;

        return this.filterBoardList(boardList).map(
            board => <BoardListItem
                key={board.boardID}
                board={board}
                isFavourite={this.isFavourite(board.boardID)}
                onClick={() => {
                    emitCloseHeaderPanel();
                    emitThreadClose();
                    emitHeaderExpand();
                    fetchBoard(board.boardID);
                }}
            />
        );
    }

    filterBoardList = boardList => {
        const { searchPhrase, favouritesOnly, adultOnly } = this.state;

        if (!boardList || !boardList.length) {
            return [];
        }

        if (favouritesOnly) {
            // TODO: Favourite boards - read from redux
            boardList = boardList.filter( board => this.isFavourite(board.boardID) );
        }

        if (adultOnly) {
            boardList = boardList.filter( board => board.info.NSFW );
        }

        if (searchPhrase) {
            boardList = boardList.filter( board =>
                board.description
                     .toLowerCase()
                     .includes(searchPhrase)
            );
        }

        return boardList;
    }

    isFavourite( boardID ) {
        for (var i = 0; i < this.props.favourites.length; i++)
            if (this.props.favourites[i] === boardID)
                return true;

        return false
    }


    toggleAdultBoards = () => {
        this.setState(state => ({
            adultOnly: !state.adultOnly
        }));
    }

    toggleFavouriteBoards = () => {
        this.setState(state => ({
            favouritesOnly: !state.favouritesOnly
        }));
    }
}

export default connect(BoardListPage);
