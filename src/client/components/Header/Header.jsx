import React, { Component } from "react";
import classNames from "classnames";

import Logo from "../Logo";
import Icon from "../Icon";
import SearchBox from "../SearchBox";
import Hierarchy from "../Hierarchy";
import HeaderItem from "../HeaderItem";

import {version} from "../../../../package.json"

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.returnHome = this.returnHome.bind(this);
    }

    render() {
        // Actions
        const { scrollPage, scrollHeader, closeThread, toggleNavbar } = this.props;
        // State
        const { threadIsActive, provider, boardID, threadID } = this.props;

        const placeholder = `Search ${threadIsActive ? "thread" : "board"} ...`

        const headerContent = classNames('header-content', {
            'thread': threadIsActive, 
            'board': !threadIsActive
        })

        return (
            <div id="header" className="header">
                <div className="header-background"/>
                <div className={headerContent}>
                    <HeaderItem className="icon" onClick={this.toggleActive}>
                        <Icon name="menu" onClick={toggleNavbar}/>
                    </HeaderItem>
                    <HeaderItem className="lurka">
                        Lurka v{version}
                    </HeaderItem>
                    <HeaderItem className="breadcrumb">
                        <Hierarchy provider={provider} boardID={boardID} threadID={threadID}/>
                    </HeaderItem>
                    <HeaderItem className="searchbox">
                        <SearchBox placeholder={placeholder} onKeyUp={this.handleKeyUp}/>
                    </HeaderItem>
                    <HeaderItem className="icon shift-right" onClick={this.toggleActive}>
                        <Icon name="eye" onClick={this.returnHome} />
                    </HeaderItem>
                    <HeaderItem className="icon" onClick={this.toggleActive}>
                        <Icon name="archive" />
                    </HeaderItem>
                    <HeaderItem className="icon" onClick={this.toggleActive}>
                        <Icon name="filter" />
                    </HeaderItem>
                    <HeaderItem className="icon" onClick={this.toggleActive}>
                        <Icon name="sort" />
                    </HeaderItem>
                </div>
            </div>
        )  // TODO: Add filter functionality + buttons
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

    toggleActive(e) {
        console.log('toggling active')
        e.target.classList.toggle('active')
    }
}
