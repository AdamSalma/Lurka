import './Overlay.styles'
import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import {bindMembersToClass} from '~/utils/react';

class Overlay extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        bindMembersToClass(this, 'show', 'hide');
    }

    componentWillUpdate(nextProps, nextState) {
        if (this.props.isVisible !== nextProps.isVisible) {
            nextProps.isVisible ? this.show() : this.hide();
        }
    }

    render() {
        const { isVisible, className, children, ...restProps } = this.props;
        return <div {...restProps} className={cx("Overlay", className, {"Overlay-active": isVisible})}>
            {children}
        </div>
    }

    show() {
        console.warn("Overlay.show()")
        this.setState({
            isVisible: true
        });
    }

    hide() {
        console.warn("Overlay.hide()")
        this.setState({
            isVisible: false
        });
    }
}

export default Overlay
