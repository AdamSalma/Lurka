/**
 * This file is deprecated as of v0.10.0
 */

import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import classNames from 'classnames'
import uuid from 'uuid'

import BoardListContainer from "../containers/BoardListContainer";
import Settings from "../containers/Settings";

import Logo from "../../components/Logo";
import Elipses from "../../components/Elipses";
import BoardTile from "../../components/BoardTile";
import Searchbox from "../../components/Searchbox";

import {
    changeProvider
} from '../actions/StatusActions';

import {
    scrollPage, scrollHeader
} from '../actions/AnimationActions';

import { fetchBoard } from '../actions/BoardActions';
import { fetchBoardList, addToFavourites, removeFromFavourites } from '../actions/BoardListActions';


// import scroll action here

class HomePanel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tilesPerPage: 20,
            animate: false
        }

        this.slickOpts = {
            infinite: true,
            adaptiveHeight: true,
            slidesToShow: 1,
            dots: true
        }

        this.setupTilesIfLoaded = this.setupTilesIfLoaded.bind(this)
        this.handleClick = this.handleClick.bind(this)
    }

    componentDidMount() {
        this.setupTilesIfLoaded()
    }

    componentDidUpdate(prevProps, prevState) {
        this.setupTilesIfLoaded()
    }

    render() {
        const {
            scrollPage, scrollHeader, fetchBoard, fetchBoardList, changeProvider, 
            addToFavourites, removeFromFavourites,
            
            status:{provider}, boardList, threadIsActive, settings
        } = this.props;

        const homeClasses = classNames('page page-home', {'animate': this.state.animate})

        return (
            <div className={homeClasses}>
                <div className="tile-controls">
                    <input type="button" value="Click" onClick={this.handleClick}/>
                    <Searchbox />
                </div>
                <div className="board-tiles" ref={t => this._tiles = $(t)}>
                    {this.createBoardTiles()}
                </div>
            </div>
        )
    }

    setupTilesIfLoaded() {
        const { boardList, status:{ provider }} = this.props
        const boards = boardList[provider]

        if (boardList[provider] && boardList[provider].length) {
            this._tiles.slick(this.slickOpts);
        }
    }

    createBoardTiles(){
        const {tilesPerPage} = this.state
        const {boardList, status:{provider}} = this.props
        const boards = boardList[provider]
        let pages = []

        if (!boards) 
            return false

        // Split board into segments
        const pageCount = Math.ceil(boards.length / tilesPerPage)
        for (var i = 0; i < pageCount; i++) {
            pages.push(
                boards.slice(i*tilesPerPage, (i+1)*tilesPerPage)
            )
        }

        return pages.map(boards => 
            <div className="board-tile-page" key={uuid.v4()}>
                {boards.map(board =>
                    <BoardTile 
                        {...board} 
                        key={board.boardID}
                        onClick={fetchBoard.bind(null, {boardID: board.boardID})}
                    />
                )}
            </div>
        )
    }


    handleClick(){
        this.setState({
            animate: true
        })
    }
}

function mapStateToProps({status, boardList, thread, settings}) {
    return {
        status,
        settings,
        boardList,
        threadIsActive: thread.isActive
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeProvider,
        scrollPage,
        scrollHeader,
        fetchBoardList,
        fetchBoard,
        addToFavourites, 
        removeFromFavourites
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePanel)
