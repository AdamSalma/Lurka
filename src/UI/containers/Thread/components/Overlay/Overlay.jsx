import './Overlay.styles'
import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import {bindMembersToClass} from '~/utils/react';

class Overlay extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    static defaultProps = {
        startVisible: false
    }

    constructor(props) {
        super(props);
        bindMembersToClass(this, 'show', 'hide');
        this.state = {
            isVisible: props.startVisible
        }
    }

    render() {
        const { className, children, startVisible, ...restProps } = this.props;
        return <div {...restProps} className={cx("Overlay", className, {
            "Overlay-active": this.state.isVisible
        })}>
            {children}
        </div>
    }

    show() {
        if (!this.state.isVisible) {
            this.setState({
                isVisible: true
            });
        }
    }

    hide() {
        if (this.state.isVisible) {
            this.setState({
                isVisible: false
            });
        }
    }
}

export default Overlay
