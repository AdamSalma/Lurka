import React, { Component } from "react";

import Velocity from 'velocity-animate';
import classNames from "classnames";

import Logo from "../Logo";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.onHeaderExpand = this.onHeaderExpand.bind(this)
    }
    render() {
        const {isMainPage, loadingText, expandHeader, scrollPage} = this.props;
        return (
            <div id="header">
                <Logo isFullsize={isMainPage} loadingText={loadingText} expandHeader={this.onHeaderExpand}/>
            </div>
        )
    }

    onHeaderExpand() {
        // TODO - check if on contentpage else return
        const {scrollPage, expandHeader} = this.props;
        expandHeader()
        scrollPage({mainPage:true})
    }
}


