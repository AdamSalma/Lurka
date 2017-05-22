import './Overlay.styles'
import React, { Component, PropTypes } from 'react';
import cx from 'classnames';

class Overlay extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            fade: props.isVisible
        }
    }

    render() {
        const { isVisible, className, children, ...restProps } = this.props;
        return <div className={cx("Overlay", className, {
            "Overlay-active": isVisible,
            "fade": this.state.fade
        })} {...restProps}>
            {children}
        </div>
    }

    show() {
        console.warn("Overlay.show()")
        this.setState({
            fade: true
        });
    }

    hide() {
        console.warn("Overlay.hide()")
        this.setState({
            fade: false
        });
    }
}

export default Overlay
