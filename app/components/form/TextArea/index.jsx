import React, { Component } from 'react';
import cx from 'classnames';
import { isFunction } from '~/utils/types';
import './styles';

class TextArea extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isFocused: false,
            value: ''
        }

        // Debounce handler until user stops typing
        // this.handleChange = utils.throttle.
        //     invokeAfterUninterruptedDelay(100, this.handleChange)
    }

    setInputRef = (ref) => this._input = ref;
    handleFocus = () => this.setState({ isFocused: true })
    handleBlur = () => this.setState({ isFocused: false })
    handleChange = (e) => {
        const { value } = e.target;

        this.setState({ value }, () => {
            if (isFunction(this.props.onChange))
                this.props.onChange(value)
        })
    }

    // Ref methods for parent access
    clear = () => this._input.clear()
    focus = () => this._input.focus()

    render() {
        const { className, label, resizable, ...restProps } = this.props;

        const isActive = this.state.isFocused || this.state.value.length > 0
        const classes = cx('TextArea', className, {
            'is-active': isActive
        });
        const textAreaClasses = cx({
            "resizable": resizable
        });

        return (
            <div className={classes}>
                <textarea {...restProps} type="text"
                    className={textAreaClasses}
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    ref={this.setInputRef}
                />
                <span className="TextArea__bar"/>
                <label className="TextArea__label">{label}</label>
            </div>
        );
    }
}

export default TextArea;
