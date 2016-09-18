import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import BoardPost from '../BoardPost';
import { catchTooltip } from './events';
import { fetchBoard } from '../../actions/board.actions';
import { fetchThread } from '../../actions/thread.actions';

class Board extends React.Component {
    componentWillMount() {
        if (!this.props.board.items.length) {
            this.props.fetchBoard({
                provider: '4chan',
                boardID: 'g'
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
                    key={thread.id}
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
    console.log("Mapping state to props. state:", state);

    return {
        board: state.board
    }
}

function mapDispatchToProps(dispatch) {
    console.log("dispatching board action");

    return bindActionCreators({fetchBoard, fetchThread}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
