import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Board } from "~/modules";

// Actions
import { 
    fetchBoard, 
    loadMorePosts, 
    scrollHeader, 
    fetchThread
} from '~/redux/actions';

class BoardPanel extends Component {
    render() {
        const {
            /* Actions */
            fetchThread, fetchBoard, loadMorePosts, scrollHeader, isAppReady,

            /* State */
            status, board, isThreadOpen, isDrawerOpen
        } = this.props;

        return (
            <div className="page page-board">
                <Board 
                    fetchBoard={fetchBoard} fetchThread={fetchThread} 
                    loadMorePosts={loadMorePosts} scrollHeader={scrollHeader}

                    board={board} provider={status.provider} isAppReady={isAppReady}
                    boardID={status.boardID} isFetching={board.isFetching}
                    isDrawerOpen={isDrawerOpen} isThreadOpen={isThreadOpen}
                /> 
            </div>
        )  // TODO: use destructuring on 'board' to pass children as props
    }
}


function mapStateToProps({ status, display, board, thread }) {
    return {
        status,
        board,
        isAppReady:   display.isAppReady,
        isDrawerOpen: display.isDrawerOpen,
        isThreadOpen: display.isThreadOpen
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchBoard, 
        fetchThread, 
        loadMorePosts,
        scrollHeader
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardPanel)
