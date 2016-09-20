import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import uuid from "uuid";

import BoardPost from '../BoardPost';
import { fetchBoard } from '../../actions/board.actions';
import { fetchThread } from '../../actions/thread.actions';
import { catchTooltip } from './events';

class Board extends React.Component {
    componentWillMount() {
        if (!this.props.board.items.length) {
            const { boardID, provider } = this.props
            this.props.fetchBoard({
                provider: provider,
                boardID: boardID
            });
        }
    }

    componentDidMount() {
        catchTooltip(this.refs.board);
    }

    componentWillUnmount() {
        $(this.refs.board).off('hover');
    }

    createThreads() {
        const { board, viewType, fetchThread } = this.props;
        var counter = 0;
        return board.items.map( thread => {
            if (counter>=50) return;
            counter++
            return (
                <BoardPost
                    key={uuid.v4()}
                    post={thread} 
                    fetchThread={fetchThread}
                />
            );
        });
    }

    render() {
        return (
            <div id="board" className="board">
                {this.createThreads()}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        board: state.board,
        provider: state.status.provider,
        boardID: state.status.boardID
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchBoard, 
        fetchThread
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
