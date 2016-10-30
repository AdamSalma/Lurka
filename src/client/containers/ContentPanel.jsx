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
} from '../actions/StatusActions';


class ContentPanel extends Component {
    render() {
        const {
            // Actions
            fetchThread, fetchBoard, fetchBoardList, closeThread, changeProvider,

            // State
            provider, boardID, threadID,
            board, thread, boardList,
            isFetching, didInvalidate

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
                    thread={thread} isFetching={isFetching}
                />
            </div>
        )
    }
}


function mapStateToProps({ content }) {
    return {
        isFetching: content.isFetching,
        didInvalidate: content.didInvalidate,

        provider: content.provider,
        boardID: content.boardID,
        threadID: content.threadID,
        
        boardList: content.boardlist,
        board: content.board,
        thread: content.thread
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
