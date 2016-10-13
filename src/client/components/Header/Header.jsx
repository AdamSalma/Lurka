import React from 'react';
import { Link } from 'react-router';
import Velocity from 'velocity-animate';
import classNames from "classnames";

import Logo from "../Logo";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.onHeaderToggle = this.onHeaderToggle.bind(this)
    }

    render() {
        const {isMainPage, loadingText} = this.props;
        return (
            <div id="header" ref='header'>
                <Logo isFullsize={isMainPage} loadingText={loadingText} toggleHeader={this.onHeaderToggle}/>
            </div>
        )
    }

    onHeaderToggle() {
        const { header } = this.refs;
        console.log("onHeaderToggle() ", header);

        if (!this.props.isMainPage){
            Velocity(
                header,
                {height: "70px"},
                {
                    duration: 1400,
                    easing: "ease-in"
                }
            )
        } else {
            Velocity(
                header,
                {height: "270px"},
                {
                    duration: 1250,
                    easing: "ease-out"
                }
            )
        }
    }

}
