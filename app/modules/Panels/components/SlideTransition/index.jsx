import React, { Component } from 'react';
import cx from 'classnames';
import {isFunction} from '~/utils/types';
import './styles';


class SlideTransition extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: true
        }
    }

    render() {
        const { className, effect, children, ...restProps } = this.props;

        const classEffect = this.getEffectClass(effect);
        const classes = cx('SlideTransition', className, classEffect, {
            "SlideTransition--animate-in": !this.state.isHidden,
            "SlideTransition--animate-out": this.state.isHidden
        });

        return (
            <div className={classes} {...restProps}>
                {children}
            </div>
        );
    }

    show = ({ callback, duration=240 }) => {
        console.log("SlideTransition.show()")
        isFunction(callback) && setTimeout(() => {console.warn('SETTIMEOUT'); callback()}, duration);
        this.setState({ isHidden: false });
    }

    hide = ({ callback, duration=240 }) => {
        console.log("SlideTransition.hide()")
        this.setState({ isHidden: true });
        isFunction(callback) && setTimeout(callback, duration);
    }

    getEffectClass(effect) {
        switch (effect) {
            case "from left":
                return "SlideTransition--from-left"
            case "from right":
                return "SlideTransition--from-right"
            case "from top":
                return "SlideTransition--from-top"
            case "from bottom":
                return "SlideTransition--from-bottom"
            default:
                throw new Error("No SlideTransition effect specified")
        }
    }
}

SlideTransition.displayName = 'SlideTransition';

export default SlideTransition;
