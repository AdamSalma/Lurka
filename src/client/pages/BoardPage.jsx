import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { Board } from "~/containers";

// Actions
import { 
    fetchBoard, 
    loadMorePosts, 
    scrollHeader, 
    fetchThread
} from '~/actions';

class ContentPanel extends Component {
    render() {
        const {
            /* Actions */
            fetchThread, fetchBoard, loadMorePosts, scrollHeader,

            /* State */
            status, board
        } = this.props;

        return (
            <div className="page page-board">
                <Board 
                    fetchBoard={fetchBoard} fetchThread={fetchThread} 
                    loadMorePosts={loadMorePosts} scrollHeader={scrollHeader}

                    board={board} provider={status.provider} 
                    boardID={status.boardID} isFetching={board.isFetching}
                /> 
            </div>
        )  // TODO: use destructuring on 'board' to pass children as props
    }
}


function mapStateToProps({ status, board }) {
    return {
        status,
        board,
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

export default connect(mapStateToProps, mapDispatchToProps)(ContentPanel)
