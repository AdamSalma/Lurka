import React, { Component } from "react";

import Velocity from 'velocity-animate';  // TODO: Is this needed? Logo?
import classNames from "classnames";

import Logo from "../Logo";
// import BoardList from "../BoardList";
import SearchBox from "../SearchBox";
import Icon from "../Icon";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.returnHome = this.returnHome.bind(this);
    }

    componentWillUpdate({ statusMessage }) {
        if (this.props.statusMessage && !statusMessage) {
            // Status message will be cleared
            this.setState({fadeOut: true})
        }
    }

    render() {
        const { scrollPage, scrollHeader, statusMessage, threadIsActive, closeThread } = this.props;
        const placeholder = `Search ${threadIsActive ? "thread" : "board"} ...`

        return (
            <div id="header" className="header">
                <div className="header-background"/>
                <div className="header-content">
                    <Logo />
                    <SearchBox placeholder={placeholder} onKeyUp={this.handleKeyUp}/>
                    <Icon name="arrow-up" onClick={this.returnHome} />
                </div>
            </div>
        )  // TODO: Add search/filter functionality
    }

    returnHome(){
        this.props.closeThread(null,  // threadID
            this.props.scrollPage.bind(null, "content", false) // page to scroll, scroll up
        )
    }

    handleKeyUp(event) {
        // TODO
        this.props.filterBoard(event.target.value)
    }
}
