import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Board from "../components/Board";
import Thread from "../components/Thread";
import ContentOptions from "../components/ContentOptions";

import {
    fetchBoard, 
    fetchBoardList, 
    incrementBoardLimit
} from '../actions/BoardActions';

import { 
    fetchThread, 
    closeThread 
} from '../actions/ThreadActions';

import { 
    changeProvider 
} from '../actions/StatusActions';


class ContentPanel extends Component {
    render() {
        const {
            // Actions
            fetchThread, fetchBoard, fetchBoardList, closeThread, changeProvider, 
            incrementBoardLimit,

            // State
            status, board, thread

        } = this.props;

                    // <ContentOptions 
                    //     changeProvider={changeProvider} fetchBoardList={fetchBoardList} fetchBoard={fetchBoard}
                    //     boardList={boardList} provider={provider}
                    // />
        return (
            <div className="page page-content">
                <div className="content-overview">
                    <Board 
                        fetchBoard={fetchBoard} fetchThread={fetchThread} incrementLimit={incrementBoardLimit}
                        board={board} provider={status.provider} boardID={status.boardID} isFetching={board.isFetching}
                    />
                </div>
                <Thread 
                    closeThread={closeThread}
                    thread={thread} isActive={thread.isActive} isFetching={thread.isFetching} threadID={status.threadID}
                />
            </div>
        )
    }
}


function mapStateToProps({ status, thread, board, boardlist }) {
    return {
        status: status,        
        boardList: boardlist,
        board: board,
        thread:thread
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchBoard, 
        fetchBoardList,
        fetchThread,
        closeThread,
        changeProvider,
        incrementBoardLimit
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentPanel)
