import React from 'react';
import classNames from 'classnames';
import Velocity from 'velocity-animate';

class Logo extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Logo';
        this.toggleLogoSize = this.toggleLogoSize.bind(this);
    }

    componentDidMount() {
    	setTimeout(() => {
	        this.toggleLogoSize()
    	}, 1000)
    }

    render() {
    	const { isFullsize, loadingText } = this.props;
		const logoClasses = classNames("logo", {"logo-fullsize": isFullsize});

		console.log("isFullsize?", isFullsize)
        return (
        	<div id="logo" ref="logo" className="logo-fullsize">
                <img ref="logoImg" src='./logo.png' className={logoClasses}/>
                {() => {if (!isFullsize) <span>{loadingText}</span>}}
            </div>
		)
    }

    toggleLogoSize() {
    	const {logo, logoImg} = this.refs;
    	if (this.props.isFullsize) {
    		const distance = window.innerWidth - 90 + "px"

	    	Velocity(logo, {right: distance, top: "10px", width: "50px"}, {
                duration: 1250,
                easing: [0.25, 0.8, 0.25, 1]
            })

            Velocity(logoImg, {width: "50px"}, {
                duration: 1250,
            })

    	} else {
    		Velocity(
	    		this.refs.logo,
	    		{opacity: 1}
	    	)
    	}

    	this.props.toggleHeader()
    }
}

export default Logo;
