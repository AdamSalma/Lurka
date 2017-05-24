import './Tooltip.styles'
import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';

import { bindMembersToClass } from '~/utils/react'

export default class Tooltip extends PureComponent {

    static defaultProps = {
        className: '',
        position: 'top',
        content: 'No tooltip provided',
        effect: 'scale',
    };

    static propTypes = {
        className: PropTypes.string,
        position: PropTypes.oneOf([
            'top', 'bottom', 'left', 'right'
        ]),
        effect: PropTypes.oneOf([
            'fade', 'scale'
        ]),
        content: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.element
        ]),
    };

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
        const { content, className, children, effect, position:pos, ...restProps } = this.props
        const mainClass = cx('Tooltip', {
            'Tooltip--active': this.state.isVisible
        })

        const wrapperClass = cx(
            className,
            "Tooltip__wrap",
            `Tooltip__content--effect-${this.props.effect}`
        )

        const contentClass = cx(
            'Tooltip__content',
            `Tooltip__wrap--${pos}`,
        )

        return (
            <div {...restProps}
            className='Tooltip'
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}>
                <div className={wrapperClass}>
                    <div className={contentClass}>
                        {content}
                    </div>
                </div>
                {children}
            </div>
        )
    }
}
