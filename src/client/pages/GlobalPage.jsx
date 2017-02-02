import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import AlertContainer from 'react-alert'
import Header from "../containers/Header";
import Navbar from "../containers/Navbar";

import { closeThread } from '../actions/ThreadActions';
import { changeProvider } from '../actions/StatusActions';
import { toggleSetting } from '../actions/SettingsActions';
import { fetchBoard, destroyBoard, searchBoard } from '../actions/BoardActions';
import { scrollPage, scrollHeader, toggleNavbar } from '../actions/AnimationActions';
import { fetchBoardList, searchBoardlist, addToFavourites, removeFromFavourites } from '../actions/BoardListActions';


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
            searchBoard, closeThread, changeProvider, toggleNavbar, 
            toggleSetting, searchBoardlist,

            status, boardList, threadIsActive, settings
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
                    boardList={boardList} toggleNavbar={toggleNavbar}
                />  
                <Navbar 
                    fetchBoardList={fetchBoardList}
                    addToFavourites={addToFavourites}
                    removeFromFavourites={removeFromFavourites}
                    scrollPage={scrollPage} scrollHeader={scrollHeader} 
                    changeProvider={changeProvider} fetchBoard={fetchBoard}
                    toggleNavbar={toggleNavbar} toggleSetting={toggleSetting}
                    searchBoardlist={searchBoardlist}

                    status={status} boardList={boardList} settings={settings}
                />
                <AlertContainer ref={a => this.msg = a} position='bottom right'/>
            </div>
        )
    }

    showAlert({message, type='info', time=4000, icon=false}) {
        if (type === 'info') {
            icon = <img src="alert-info.png"/>
        }

        this.msg.show(message, {time, type, icon})
    }
}

function mapStateToProps({status, boardList, thread, settings, board}) {
    return {
        status,
        boardList,
        threadIsActive: thread.isActive,
        settings,
        board
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        scrollPage,
        searchBoard,
        scrollHeader,
        changeProvider,
        fetchBoardList,
        fetchBoard,
        addToFavourites, 
        removeFromFavourites,
        destroyBoard,
        closeThread,
        toggleNavbar,
        toggleSetting,
        searchBoardlist
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GlobalPanel)
