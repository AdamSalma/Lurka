import React, { Component } from "react";
import classNames from "classnames";

import Logo from "../Logo";
import Icon from "../Icon";
import SearchBox from "../SearchBox";
import Hierarchy from "../Hierarchy";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.returnHome = this.returnHome.bind(this);
    }

    render() {
        // Actions
        const { scrollPage, scrollHeader, closeThread } = this.props;
        // State
        const { threadIsActive, provider, boardID, threadID } = this.props;

        const placeholder = `Search ${threadIsActive ? "thread" : "board"} ...`

        return (
            <div id="header" className="header">
                <div className="header-background"/>
                <div className="header-content-wrap">
                    <div className="header-content">
                        <Logo />
                        <SearchBox placeholder={placeholder} onKeyUp={this.handleKeyUp}/>
                        <Hierarchy provider={provider} boardID={boardID} threadID={threadID}/>
                        <Icon name="arrow-up" onClick={this.returnHome} />
                    </div>
                </div>
            </div>
        )  // TODO: Add search/filter functionality
    }

    returnHome(){
        const { closeThread, scrollPage, destroyBoard, scrollHeader } = this.props

        closeThread(null,  // threadID
            () => {
                scrollHeader(false)  // hide header
                scrollPage({
                    page: "board", 
                    direction: "down",
                    callback: destroyBoard
                })   
            }
        )
    }

    handleKeyUp(event) {
        this.props.searchBoard(event.target.value)
    }
}
