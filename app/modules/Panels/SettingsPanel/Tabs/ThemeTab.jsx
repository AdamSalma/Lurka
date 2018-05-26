import React, { Component } from 'react';
import cx from 'classnames';
import { ChromePicker as ColorPicker } from 'react-color'

import './ThemeTab.styles';
import CSSInjector from '~/themes/CSSInjector';
import {Scrollable} from '~/components';
import {emitThemeChange} from '~/events'
import utils from '~/utils';

class ThemeTab extends Component {
    constructor(props) {
        super(props);

        this.state = {
            displayColorPicker: false,
            currentVariable: null,
            variables: CSSInjector.extractVariables(),
            colorPickerPosition: {}
        }

        // this.handleThemeChange = utils.throttle.invokeAfterUninterruptedDelay(200, this.handleThemeChange)
    }

    render() {
        const { className, } = this.props;
        const { displayColorPicker, variables, currentVariable, colorPickerPosition } = this.state;

        return (
            <Scrollable translate3d className={cx('ThemeTab', className)} onClick={this.handleModalClick}>
                {displayColorPicker &&
                    <div className="color-picker" style={colorPickerPosition}>
                        <ColorPicker
                            color={variables[currentVariable]}
                            onChangeComplete={this.handleThemeChange}
                        />
                    </div>
                }
                <div className="variables">
                    {Object.keys(variables).map(variable => (
                        <div key={variable}
                            className="variable"
                            onClick={(e) => this.handleInputOpen(e, variable)}>
                            <div className="color" style={{
                                backgroundColor: variables[variable],
                                color: variables[variable]
                            }}/>
                            <div className="name">{variable}</div>
                        </div>
                    ))}
                </div>
            </Scrollable>
        );
    }

    handleInputOpen = (e, variable) => {
        e.stopPropagation();
        e.preventDefault()
        // Get mouse coords
        const rect = e.target.parentElement.getBoundingClientRect(),
              top = e.screenY - rect.top,
              left = e.screenX - rect.left;

        e.preventDefault();
        this.setState({
            currentVariable: variable,
            displayColorPicker: true,
            colorPickerPosition: {top, left}
        });
    }

    handleThemeChange = (color, e) =>{
        e.stopPropagation();
        e.preventDefault()
        console.log("handleThemeChange")

        const { currentVariable } = this.state;
        const css = this.convertToCss(color);

        emitThemeChange({[currentVariable]: css});
    }

    convertToCss({ hex, rgb }) {
        return rgb.a ? `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})` : hex
    }

    handleModalClick = (e) => {
        if (this.state.displayColorPicker) {
            e.stopPropagation()
            this.setState({
                displayColorPicker: false,
                currentVariable: null,
                colorPickerPosition: {}
            })
        }
    }
}

export default ThemeTab;
