import React, { Component } from "react";

import classNames from 'classnames';
import Velocity from 'velocity-animate';

class Logo extends Component {
    constructor(props) {
        super(props);
        this.displayName = 'Logo';
        this.scrollToHome = this.scrollToHome.bind(this)
    }

    render() {
        const { isFullsize, statusMessage } = this.props;
        const logoClasses = classNames("logo", {"logo-fullsize": isFullsize});

        return ( 
            <div 
                id="logo" ref="logo" 
                className={statusMessage ? "logo-rotating" : ""} 
                onClick={this.scrollToHome}
            >
                <img src='./logo.png' className={logoClasses}/>
            </div>      
        )
    }

    scrollToHome() {
        const {isFullsize, scrollPage} = this.props
        if (!isFullsize) {
            scrollPage("content", false)  // scrolls content page away to reveal home
        }
    }
}

export default Logo;
