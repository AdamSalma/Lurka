import React, { PureComponent } from 'react';
import classes from 'classnames';


export default class ToggleOnClick extends PureComponent {
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
        const toggleClasses = classes(className, {
            'toggled': isExpanded,
        })

        return <div className={toggleClasses} onClick={this.toggle} {...rest}>
            {isExpanded ? to : _from }
        </div>
    }

    toggle() {
        this.setState(state => {
            console.log('ToggleOnClick() clicked. expanding ?', state.isExpanded)
            return {
                isExpanded: !state.isExpanded
            }
        })
    }
}

