import './Overlay.styles'
import React, { Component } from 'react';
import cx from 'classnames';

class Overlay extends Component {
    static defaultProps = {
        startVisible: false
    }

    constructor(props) {
        super(props);
        this.state = {
            isVisible: props.startVisible
        }
    }

    render() {
        const { className, children, startVisible, ...restProps } = this.props;
        return <div {...restProps} className={cx("ThreadOverlay", className, {
            "Overlay-active": this.state.isVisible
        })}>
            {children}
        </div>
    }

    show = () => {
        if (!this.state.isVisible) {
            this.setState({
                isVisible: true
            });
        }
    }

    hide = () => {
        if (this.state.isVisible) {
            this.setState({
                isVisible: false
            });
        }
    }
}

export default Overlay
