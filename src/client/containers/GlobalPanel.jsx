import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AlertContainer from 'react-alert'
import Header from "../components/Header";

import {
    scrollPage, scrollHeader
} from '../actions/AnimationActions';

import { closeThread } from '../actions/ThreadActions';
import { fetchBoard, destroyBoard, searchBoard } from '../actions/BoardActions';
import { fetchBoardList, addToFavourites, removeFromFavourites } from '../actions/BoardListActions';


// import scroll action here

class GlobalPanel extends Component {
    /*
        Container for elements that need to be at the forefront of the page
        and independant of the z-index's of other pages:
            - Header
            - Alert container
     */
    constructor(props) {
        super(props);
        this.showAlert = this.showAlert.bind(this)
    }

    componentDidUpdate({ status:{ alertMessage } }) {
        if (this.props.status.alertMessage !== alertMessage ) {
            this.showAlert(this.props.status.alertMessage)
        }
    }

    render() {
        const {
            scrollPage, scrollHeader, fetchBoard, fetchBoardList, 
            addToFavourites, removeFromFavourites, destroyBoard,
            searchBoard, closeThread,            

            status, boardList, threadIsActive
        } = this.props;

        return (
            <div className="page page-global">
                <Header 
                    scrollPage={scrollPage} scrollHeader={scrollHeader} 
                    fetchBoardList={fetchBoardList} fetchBoard={fetchBoard} 
                    searchBoard={searchBoard} closeThread={closeThread}
                    destroyBoard={destroyBoard}

                    alertMessage={status.alertMessage} currentPage={status.currentPage}
                    provider={status.provider} boardID={status.boardID}
                    threadID={status.threadID} threadIsActive={threadIsActive}
                    boardList={boardList} 
                />  
                <AlertContainer ref={a => this.msg = a}/>
            </div>
        )
    }

    showAlert({message, type='info'}) {
        this.msg.show(message, {
            time: 4000,
            type
        })
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
        scrollPage,
        searchBoard,
        scrollHeader,
        fetchBoardList,
        fetchBoard,
        addToFavourites, 
        removeFromFavourites,
        destroyBoard,
        closeThread
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalPanel)
