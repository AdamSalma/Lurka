import React, { Component } from 'react';
import cx from 'classnames';

import {ButtonCircle} from '~/components/UI';
import './styles';


class ControllerButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isActive: props.isActive || false
        }
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.state.isActive !== nextState.isActive;
    }

    render() {
        const { className, children, isActive, ...restProps } = this.props;
        const classes = cx('ControllerButton', className, {
            "ControllerButton--is-active": this.state.isActive
        });

        return (
            <ButtonCircle className={classes} onClick={this.toggleState} {...restProps}>
                {children}
            </ButtonCircle>
        );
    }

    toggleState = () => {
        this.state.isActive
            ? this.deactivate()
            : this.activate()
    }

    deactivate = () => {
        this.setState({
            isActive: false
        }, this.props.onDeactivate)
    }

    activate = () => {
        this.setState({
            isActive: true
        }, this.props.onActivate)
    }
}

export default ControllerButton;
