import React, { Component } from "react";

import classNames from 'classnames';
import Velocity from 'velocity-animate';

class Logo extends Component {
    constructor(props) {
        super(props);
        this.displayName = 'Logo';
    }
    
    componentDidMount() {
        this.triggerLogoDropdownAnimation(this.refs.logoImg)
    }

    render() {
    	const { isFullsize, loadingText, expandHeader} = this.props;
		const logoClasses = classNames("logo", {"logo-fullsize": isFullsize});

		const text = !isFullsize ? <span>{loadingText}</span> : ""  // create action for logo toggle, changes isFullsize, changes text

        return (
        	<div id="logo" ref="logo" className="logo-fullsize">
                <img ref="logoImg" src='./logo.png' className={logoClasses} onClick={expandHeader}/>
                {text}
            </div>
		)
    }

    triggerLogoDropdownAnimation(logo) {
        console.log("triggerLogoDropdownAnimation()", logo)
        Velocity(logo, {opacity: 1, top: "+10px"}, {duration: 1000})

    }
}

export default Logo;
