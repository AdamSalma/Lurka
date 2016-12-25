import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Header from "../components/Header";
import Board from "../components/Board";
import Thread from "../components/Thread";

// Actions
import { fetchBoardList } from '../actions/BoardListActions';
import { fetchBoard, incrementBoardLimit, filterBoard } from '../actions/BoardActions';
import { fetchThread, closeThread } from '../actions/ThreadActions';
import { changeProvider } from '../actions/StatusActions';
import { scrollPage, scrollHeader } from '../actions/AnimationActions';

class ContentPanel extends Component {
    render() {
        const {
            // Actions
            fetchThread, fetchBoard, fetchBoardList, closeThread, changeProvider, 
            incrementBoardLimit, scrollPage, scrollHeader, filterBoard,

            // State
            status, board, thread, boardList

        } = this.props;

        return (
            <div className="page page-content">
                <Header 
                    scrollPage={scrollPage} scrollHeader={scrollHeader} 
                    fetchBoardList={fetchBoardList} fetchBoard={fetchBoard} 
                    filterBoard={filterBoard}

                    statusMessage={status.statusMessage} boardList={boardList} 
                    provider={status.provider} currentPage={status.currentPage}
                    boardID={status.boardID} threadID={status.threadID} 
                    threadIsActive={thread.isActive}
                />  
                <div className="content-overview">
                    <Board 
                        fetchBoard={fetchBoard} fetchThread={fetchThread} 
                        incrementLimit={incrementBoardLimit} scrollHeader={scrollHeader}

                        board={board} provider={status.provider} 
                        boardID={status.boardID} isFetching={board.isFetching}
                    />
                </div>
                <Thread 
                    closeThread={closeThread}

                    thread={thread} isActive={thread.isActive} 
                    isFetching={thread.isFetching} threadID={status.threadID}
                />
            </div>
        )
    }
}


function mapStateToProps({ status, thread, board, boardList }) {
    return {
        status,        
        boardList,
        board,
        thread
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchBoard, 
        fetchBoardList,
        fetchThread, 
        closeThread,
        changeProvider,
        incrementBoardLimit,
        scrollPage, 
        scrollHeader,
        filterBoard
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentPanel)
