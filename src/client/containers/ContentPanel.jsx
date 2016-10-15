import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Board from "../components/Board";
import Thread from "../components/Thread";
import ContentOptions from "../components/ContentOptions";

import {
    fetchBoard, 
    fetchBoardList 
} from '../actions/BoardActions';

import { 
    fetchThread, 
    closeThread 
} from '../actions/ThreadActions';

import { 
    changeProvider 
} from '../actions/HeaderActions';


class ContentPanel extends Component {
    render() {
        const {
            // Actions
            fetchThread, fetchBoard, fetchBoardList, closeThread, changeProvider,

            // State
            board, provider, boardID, boardList,
            thread, isFetching, postsLoaded

        } = this.props;

                    // <ContentOptions 
                    //     changeProvider={changeProvider} fetchBoardList={fetchBoardList} fetchBoard={fetchBoard}
                    //     boardList={boardList} provider={provider}
                    // />
        return (
            <div className="page page-content">
                <div className="content-overview">
                    <Board 
                        fetchBoard={fetchBoard} fetchThread={fetchThread}
                        board={board} provider={provider} boardID={boardID}
                    />
                </div>
                <Thread 
                    closeThread={closeThread}
                    thread={thread} isFetching={isFetching} postsLoaded={postsLoaded}
                />
            </div>
        )
    }
}


function mapStateToProps({status, thread, board}) {
    return {
        board: board,
        provider: status.provider,
        boardID: status.boardID,
        boardList: board.boardList,

        thread: thread.posts,
        isFetching: thread.isFetching,
        postsLoaded: thread.postsLoaded,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchBoard, 
        fetchBoardList,
        fetchThread,
        closeThread,
        changeProvider 
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentPanel)
