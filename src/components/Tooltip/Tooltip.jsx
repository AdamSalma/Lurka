import './Tooltip.styles'
import React, { Component, PropTypes } from 'react';
import cx from 'classnames';
import {bindMembersToClass} from '~/utils';

export default class Tooltip extends Component {
    constructor(props) {
        super(props);

        bindMembersToClass(this,
            'show',
            'hide',
            'onMouseEnter',
            'onMouseLeave'
        )

        this.state = {
            isVisible: false
        }
    }

    componentDidMount() {
        const {clientWidth, clientHeight} = this.refs.tip

        this.size = {
            height: clientHeight,
            width: clientWidth
        }
    }

    onMouseEnter(e) {
        this.show(this.props.onMouseEnter)
    }

    onMouseLeave(e) {
        this.hide(this.props.onMouseLeave)
    }

    show(callback) {
        this.setState({isVisible: true}, () => {
            if (typeof this.props.onMouseEnter !== 'undefined') {
                callback()
            }
        })
    }

    hide(callback) {
        this.setState({isVisible: false}, () => {
            if (typeof this.props.onMouseEnter !== 'undefined') {
                callback()
            }
        })
    }

    render() {
        const { tooltip, className, children, position:pos, ...restProps } = this.props
        const contentClasses = cx(
            className,
            "Tooltip__content",
            `Tooltip__content--${pos}`,
            {'Tooltip__content--active': this.state.isVisible}
        )

        const tipStyles = {        }

        return (
            <div
            {...restProps}
            className='Tooltip'
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}>
                <div ref="tip" className={contentClasses} style={tipStyles}>
                    {tooltip}
                </div>
                {children}
            </div>
        )
    }
}

Tooltip.defaultProps = {
    className: '',
    position: 'top',
    tooltip: 'No tooltip provided'
}

Tooltip.propTypes = {
    className: PropTypes.string,
    position: PropTypes.oneOf(['top', 'bottom', 'left', 'right']),
    tooltip: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ]),
}
