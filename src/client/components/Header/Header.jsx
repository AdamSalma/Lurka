import React, { Component } from "react";

import Velocity from 'velocity-animate';  // TODO: Is this needed? Logo?
import classNames from "classnames";

import Logo from "../Logo";
// import BoardList from "../BoardList";
import SearchBox from "../SearchBox";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    componentWillUpdate({ statusMessage }) {
        if (this.props.statusMessage && !statusMessage) {
            // Status message will be cleared
            this.setState({fadeOut: true})
        }
    }

    render() {
        const { scrollPage, scrollHeader, statusMessage, threadIsActive } = this.props;
        const placeholder = `Search ${threadIsActive ? "thread" : "board"} ...`

        return (
            <div id="header" className="header">
                <div className="header-background"/>
                <div className="header-content">
                    <Logo />
                    <SearchBox placeholder={placeholder} onKeyUp={this.handleKeyUp}/>
                    <input 
                        type="button" value="Return" 
                        onClick={scrollPage.bind(null, "content", false)} 
                    />
                </div>
            </div>
        )  // TODO: Add search/filter functionality
    }

    handleKeyUp(event) {
        // TODO
        this.props.filterBoard(event.target.value)
    }
}
