import React from 'react';
import classNames from 'classnames';
import Velocity from 'velocity-animate';

class Logo extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Logo';
        this.toggleLogoSize = this.toggleLogoSize.bind(this);
        this.triggerTransitionAnimation = this.triggerTransitionAnimation.bind(this);
    }

    componentWillUpdate(nextProps, nextState) {
        if (nextProps.isFullsize !== this.props.isFullsize) 
            this.triggerTransitionAnimation();
    }
    
    componentDidMount() {
        this.triggerLogoDropdownAnimation(this.refs.logoImg)
    }

    render() {
    	const { isFullsize, loadingText } = this.props;
		const logoClasses = classNames("logo", {"logo-fullsize": isFullsize});

		const text = !isFullsize ? <span>{loadingText}</span> : ""  // create action for logo toggle, changes isFullsize, changes text

        return (
        	<div id="logo" ref="logo" className="logo-fullsize">
                <img ref="logoImg" src='./logo.png' className={logoClasses}/>
                {text}
            </div>
		)
    }

    triggerTransitionAnimation(){
        console.log("isFullsize?", this.props.isFullsize);
        console.log("Triggering logo");
        this.toggleLogoSize()
        console.log("Triggering header");
        this.props.toggleHeader()
    }

    toggleLogoSize() {
    	const {logo, logoImg} = this.refs;
    	if (this.props.isFullsize) {
    		const distance = window.innerWidth - 90 + "px"

	    	Velocity(logo, {right: distance, top: "10px", width: "50px"}, {
                duration: 1250,
                easing: "ease-out"
            })

            Velocity(logoImg, {width: "50px"}, {
                duration: 1250,
            })

    	} else {
    		Velocity(logo, {right: 0, top: "70px", width: "200px"}, {
                duration: 1250,
                easing: "[0.25, 0.8, 0.25, 1]"
            })

            Velocity(logoImg, {width: "200px"}, {
                duration: 1250,
            })
    	}

    	this.props.toggleHeader()
    }

    triggerLogoDropdownAnimation(logo) {
        console.log("triggerLogoDropdownAnimation()", logo)
        Velocity(logo, {opacity: 1, top: "+10px"}, {duration: 1000})

    }
}

export default Logo;
