import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Velocity from 'velocity-animate';  // TODO: Is this needed?

import Logo from "../components/Logo";
import BoardLists from "../components/BoardLists";
import Elipses from "../components/Elipses";

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
        this.countLoading = this.countLoading.bind(this)
    }

    render() {
        const {
            scrollPage, scrollHeader, fetchBoard, fetchBoardList, changeProvider, 
            addToFavourites, removeFromFavourites,
            
            status, boardList, threadIsActive
        } = this.props;

        return (
            <div className="page page-home">
                <Logo />
                {this.countLoading()}
                <BoardLists 
                    // Actions
                    scrollPage={scrollPage} scrollHeader={scrollHeader} 
                    fetchBoardList={fetchBoardList} fetchBoard={fetchBoard} 
                    changeProvider={changeProvider} addToFavourites={addToFavourites}
                    removeFromFavourites={removeFromFavourites}

                    // Status
                    boardList={boardList} provider={status.provider} status={status}
                />
            </div>
        )
    }

    countLoading(){
        const {boardList, status: {providers}} = this.props
        const todo = providers.filter( provider => {
            return !(boardList[provider] && boardList[provider].length)
        })

        if (todo.length) {
            const text = `Loading ${todo.join(', ')}`
            return <Elipses text={text} interval={200} maxDots={3} />
        } else return <h3>Select a provider</h3>

    }
}

function mapStateToProps({status, boardList, thread}) {
    return {
        status,
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
