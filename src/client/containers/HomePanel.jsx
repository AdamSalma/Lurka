import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Velocity from 'velocity-animate';

import Header from "../components/Header";
import BoardLists from "../components/BoardLists";

import {
    changeProvider
} from '../actions/StatusActions';

import {
    scrollPage
} from '../actions/AnimationActions';

import {
    fetchBoardList, fetchBoard
} from '../actions/BoardActions';

// import scroll action here

class HomePanel extends Component {
    constructor() {
        super();
    }

    render() {
        const {
            scrollPage, fetchBoard, fetchBoardList, changeProvider,
            status, boardList, threadIsActive
        } = this.props;
        return (
            <div id="pages">
                <div className="page page-home">
                    <Header 
                        scrollPage={scrollPage} fetchBoardList={fetchBoardList} fetchBoard={fetchBoard}
                        statusMessage={status.statusMessage} boardList={boardList} provider={status.provider}
                        boardID={status.boardID} threadID={status.threadID} threadIsActive={threadIsActive}
                    />  
                    <BoardLists 
                        scrollPage={scrollPage} fetchBoardList={fetchBoardList} fetchBoard={fetchBoard} changeProvider={changeProvider}
                        boardList={boardList} provider={status.provider} status={status}
                    />
                </div>
                {this.props.children}
            </div>
        )
    }
}

function mapStateToProps({status, boardList, thread}) {
    return {
        status,
        boardList,
        threadIsActive: thread.isActive
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        changeProvider,
        scrollPage,
        fetchBoardList,
        fetchBoard
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePanel)