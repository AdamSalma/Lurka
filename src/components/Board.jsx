import React from 'react';
import BoardPost from './BoardPost';
import uuid from 'uuid';
// import request from 'request';
// console.log(request);
import { testAction } from '../actions/MemeActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import velocity from 'velocity-animate';

class Board extends React.Component {
    componentWillMount() {
        this.props.testAction()
    }

    createThreads() {
        const { onThreadRequest, board, viewType } = this.props;
        return board.items.map( thread => {
            return (
                <BoardPost
                    key={thread.id}
                    onThreadRequest={onThreadRequest}
                    post={thread}/>
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
    console.log("Mapping state to props. state is underneath:");
    console.log(state);

    return {
        board: state.board
    }
}

function matchDispatchToProps(dispatch) {
    console.log("dispatching board action");

    return bindActionCreators({testAction}, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Board)
