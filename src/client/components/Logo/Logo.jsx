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
        const { isFullsize, loadingMessage } = this.props;
        const logoClasses = classNames("logo", {"logo-fullsize": isFullsize});
        const statusClasses = classNames("status", {
            "status-active": !!loadingMessage
        })

        return (

            <div>
                <div id="logo" ref="logo" onClick={this.scrollUp}>
                    <img src='./logo.png' className={logoClasses}/>
                </div>
                <div id="status" className={statusClasses}>
                    {this.createStatusText(loadingMessage)}
                </div>
                
            </div>
        )
    }

    scrollUp() {
        const {isFullsize, scrollPage} = this.props
        if (!isFullsize) {
            scrollPage({mainPage:true})
        }
    }

    // triggerLogoDropdownAnimation(logo) {
    //     // TODO: logo animation on APP_INIT?
    //     console.log("triggerLogoDropdownAnimation()", logo)
    //     Velocity(logo, {opacity: 1, top: "+10px"}, {duration: 1000})

    // }

    createStatusText(text) {
        if (text) {
            return <span className="status-content">{text}</span>            
        }

    }
}

export default Logo;
