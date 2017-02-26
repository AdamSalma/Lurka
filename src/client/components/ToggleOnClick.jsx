import React, { Component } from 'react';
import classNames from 'classnames';


export default class ToggleOnClick extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this)

        this.state = {
            isExpanded: false
        }
    }

    render() {
        const {isExpanded} = this.state;
        const {from: _from, to, className, ...rest} = this.props
        const classes = classNames(className, 'toggle', {
            '--expanded': isExpanded,
        })

        return <div className={classes} onClick={this.toggle} {...rest}>
            {isExpanded ? to : _from }
        </div>
    }

    toggle() {
        this.setState(state => {
            return {
                isExpanded: !state.isExpanded                
            }
        })
        this.forceUpdate()
    }
}

