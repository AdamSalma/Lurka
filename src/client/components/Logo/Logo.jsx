import React, { Component } from "react";

import classNames from 'classnames';
import Velocity from 'velocity-animate';

class Logo extends Component {
    constructor(props) {
        super(props);
        this.displayName = 'Logo';
        this.scrollUp = this.scrollUp.bind(this)
    }

    render() {
        const { isFullsize, statusMessage } = this.props;
        const logoClasses = classNames("logo", {"logo-fullsize": isFullsize});

        return ( 
            <div 
                id="logo" ref="logo" 
                className={statusMessage ? "logo-rotating" : ""} 
                onClick={this.scrollUp}
            >
                <img src='./logo.png' className={logoClasses}/>
            </div>      
        )
    }

    scrollUp() {
        const {isFullsize, scrollPage} = this.props
        if (!isFullsize) {
            scrollPage({mainPage:true})
        }
    }
}

export default Logo;
