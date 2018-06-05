import './Overlay.styles'
import React, { Component } from 'react';
import cx from 'classnames';

class Overlay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isVisible: props.isVisible
        }
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.isVisible !== nextProps.isVisible) {
            nextProps.isVisible ? this.show() : this.hide();
        }
    }

    render() {
        const { className, ...restProps } = this.props;
        const { isVisible } = this.state;
        const classes = cx("Overlay", className, { "Overlay-active": isVisible });

        return <div {...restProps} className={classes}/>
    }

    show = () => {
        console.warn("Overlay.show()")
        this.setState({
            isVisible: true
        });
    }

    hide = () => {
        console.warn("Overlay.hide()")
        this.setState({
            isVisible: false
        });
    }
}

export default Overlay
