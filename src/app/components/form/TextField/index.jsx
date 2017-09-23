import React, { Component } from 'react';
import cx from 'classnames';
import utils from '~/utils'
import './styles';

class TextField extends Component {
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

    setInputRef = (ref) => this._input = ref
    handleFocus = () => { this.setState({ isFocused: true }); }
    handleBlur = () => { this.setState({ isFocused: false }); }
    handleChange = (e) => {
        const { value } = e.target;

        this.setState({ value }, () => {
            utils.types.isFunction(this.props.onChange)
                && this.props.onChange(value)
        })
    }

    // Ref methods for parent access
    clear = () => this._input.clear()
    focus = () => this._input.focus()

    render() {
        const { className, label, theme, ...restProps } = this.props;

        const isActive = this.state.isFocused || this.state.value.length > 0
        const classes = cx('TextField', className, {
            'is-active': isActive
        })

        const barStyles = isActive ? {backgroundColor: theme.primary} : null
        const labelStyles = isActive ? {color: theme.primary} : null

        return (
            <div className={classes}>
                <input {...restProps} type="text"
                    onChange={this.handleChange}
                    onFocus={this.handleFocus}
                    onBlur={this.handleBlur}
                    ref={this.setInputRef}
                />
                <span className="bar" style={barStyles}/>
                <label style={labelStyles}>{label}</label>
            </div>
        );
    }
}

export default TextField;
