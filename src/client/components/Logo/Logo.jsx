import React, { Component } from "react"
import classNames from 'classnames'

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
                id="logo"
                className={statusMessage ? "logo-rotating" : ""} 
                onClick={this.scrollToHome}
            >
                <img src='./logo.png' className={logoClasses}/>
            </div>      
        )
    }

    scrollToHome() {
        // scrolls content page away to reveal home
        console.log("logo click");
        const {scrollPage, scrollHeader} = this.props;
        scrollPage("content", false)
        scrollHeader(false)

    }
}

export default Logo;
