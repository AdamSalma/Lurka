import React from 'react';
import BoardPost from './BoardPost';
import uuid from 'uuid';
// import request from 'request';
// console.log(request);
import { fetchBoard } from '../actions/MemeActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import velocity from 'velocity-animate';

class Board extends React.Component {
    componentWillMount() {
        if (!this.props.board.items.length) {
            console.info("WILLFETCHBOARD!")
            this.props.fetchBoard({
                provider: '4chan',
                boardID: 'a'
            });

            // TODO - add "loading" action here
        }
    }

    createThreads() {
        const { fetchThread, board, viewType } = this.props;
        var counter = 0
        return board.items.map( thread => {
            if (counter>=20) return;
            console.log("Creating board posts")
            counter++
            return (
                <BoardPost
                    key={thread.id}
                    post={thread} />
            );
        });
    }

    render() {
        return (
            <div className={"board"}>{
                this.createThreads()
            }</div>
        );
    }
}

function mapStateToProps(state) {
    console.log("Mapping state to props. state:", state);

    return {
        board: state.board
    }
}

function matchDispatchToProps(dispatch) {
    console.log("dispatching board action");

    return bindActionCreators({fetchBoard}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Board)
