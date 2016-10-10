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
                <Logo isFullsize={isMainPage} loadingText={loadingText} toggleHeader={()=>this.onHeaderToggle()}/>  // Lookup how to do this again...
            </div>
        )
    }

    onHeaderToggle() {
        const { header } = this.refs;
        console.log("onHeaderToggle() ", header);

        if (this.props.isMainPage){
            Velocity(
                this.refs.header,
                {height: "70px"},
                {
                    duration: 1500,
                    easing: [0.39, 0.575, 0.565, 1]
                }
            )
        } else {
            Velocity(
                this.refs.header,
                {height: "270px"},
                {
                    duration: 1250,
                    easing: [0.25, 0.8, 0.25, 1]
                }
            )
        }
    }

}
