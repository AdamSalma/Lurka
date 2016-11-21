import React, { Component } from "react";

import Velocity from 'velocity-animate';  // TODO: Is this needed? Logo?
import classNames from "classnames";

import Logo from "../Logo";
import ContentOptions from "../ContentOptions";
import SearchBox from "../SearchBox";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.createOptions = this.createOptions.bind(this)
        this.createStatusText = this.createStatusText.bind(this)
        this.createSearchbox = this.createSearchbox.bind(this)
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

    render() {
        const { scrollPage, statusMessage } = this.props;
        return (
            <div id="header" className="header">
                <div className="header-content">
                    <Logo scrollPage={scrollPage} statusMessage={statusMessage}/>
                    {this.createStatusText()}
                    {this.createSearchbox()}
                    {this.createOptions()}
                </div>
            </div>
        )  // TODO: Add search/filter functionality
    }

    createOptions() {
        const {boardList, fetchBoardList, provider, fetchBoard} = this.props
        return <ContentOptions 
            provider={provider} 
            boardList={boardList} 
            fetchBoard={fetchBoard}
            fetchBoardList={fetchBoardList}
        />
    }

    createSearchbox() {
        const {threadIsActive} = this.props
        const placeholder = `Search ${threadIsActive ? "thread" : "board"} ...`
        return <SearchBox placeholder={placeholder}/>
    }

    createStatusText() {
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


