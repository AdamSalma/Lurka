import React, { Component } from "react";

import Velocity from 'velocity-animate';  // TODO: Is this needed? Logo?
import classNames from "classnames";

import Logo from "../Logo";
// import BoardList from "../BoardList";
import SearchBox from "../SearchBox";

export default class Header extends Component {
    constructor(props) {
        super(props);
        // this.createBoardList = this.createBoardList.bind(this)
        this.renderStatusText = this.renderStatusText.bind(this)
        this.renderSearchbox = this.renderSearchbox.bind(this)
        this.state = {
            fadeOut: false
        }
    }

    componentWillUpdate({ statusMessage }) {
        if (this.props.statusMessage && !statusMessage) {
            // Status message will be cleared
            this.setState({fadeOut: true})
        }
    }

    componentDidUpdate(prevProps, prevState) {
        console.info("header updated")
        const {currentPage, scrollHeader} = this.props;
        if (prevProps.currentPage !== currentPage) {
            scrollHeader((currentPage === "content"))
        }
    }

    render() {
        const { scrollPage, statusMessage, currentPage } = this.props;
        return (
            <div id="header" className="header">
                <div className="header-content">
                    <Logo scrollPage={scrollPage} statusMessage={statusMessage}/>
                    {this.renderStatusText()}
                    {this.renderSearchbox()}
                    {/*this.createBoardList()*/}
                </div>
            </div>
        )  // TODO: Add search/filter functionality
    }

    // createBoardList() {
    //     const {boardList, fetchBoardList, provider, fetchBoard} = this.props
    //     return <BoardList 
    //         provider={provider} 
    //         boardList={boardList[provider]} 
    //         fetchBoard={fetchBoard}
    //         fetchBoardList={fetchBoardList}
    //     />
    // }

    renderSearchbox() {
        const {threadIsActive} = this.props
        const placeholder = `Search ${threadIsActive ? "thread" : "board"} ...`
        return <SearchBox placeholder={placeholder}/>
    }

    renderStatusText() {
        const { statusMessage } = this.props;
        const statusClasses = classNames("status", {
            "status-active": !!statusMessage,
            "fade-out": this.state.fadeOut
        })

        return <div id="status" className={statusClasses}>
            {statusMessage 
                ? <span className="status-content">{statusMessage}</span> 
                : "" }
        </div>
    }
}


