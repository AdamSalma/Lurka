import './RadioGroup.styles'
import React, { PureComponent, PropTypes, Children } from 'react';
import cx from 'classnames'

import RadioField from './RadioField'
import { bindMembersToClass } from '~/utils/react'

class RadioGroup extends PureComponent {
    static propTypes = {
        className: PropTypes.string,
        activeChild: PropTypes.number,
        onChange: PropTypes.func
    };

    static defaultProps = {
        activeChild: -1
    };

    constructor(props) {
        super(props);
        this.state = {
            activeChild: props.activeChild
        }
        bindMembersToClass(this, 'handleClick')
    }

    render() {
        const {className, children} = this.props
        const {activeChild} = this.state
        return (
            <div className={cx("RadioGroup", className)}>
                {React.Children.toArray(children).map(
                    (child, index) => <RadioField
                        key={index}
                        label={child}
                        isActive={index === activeChild}
                        onClick={this.handleClick.bind(null, index)}
                    />
                )}
            </div>
        );
    }

    handleClick(index, event) {
        this.setState({activeChild: index}, () => {
            if (typeof this.props.onChange !== 'undefined') {
                this.props.onChange(event, index)
            }
        })
    }
}

export default RadioGroup;
