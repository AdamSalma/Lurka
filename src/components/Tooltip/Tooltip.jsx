import './Tooltip.styles'
import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';

import { bindMembersToClass } from '~/utils/react'
import { isFunction } from '~/utils/types'

export default class Tooltip extends PureComponent {

    static defaultProps = {
        className: '',
        position: 'top',
        content: 'No tooltip provided',
        effect: 'fade',
        delay: 2000,
        offset: "0px"
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
        delay: PropTypes.Number
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

        this.isHovering = false;
        this.hoverTimeoutInstances = 0
    }

    onMouseEnter(e) {
        this.isHovering = true;
        this.hoverTimeoutInstances++

        setTimeout(() => {
            this.hoverTimeouts--
            if (this.isHovering && this.hoverTimeoutInstances == 0)
                this.show(this.props.onMouseEnter)
        }, this.props.delay)
    }

    onMouseLeave(e) {
        this.isHovering = false
        this.isCanceled = true
        this.hide(this.props.onMouseLeave)
    }

    show(callback) {
        logger.method("Tooltip.show")
        this.setState({isVisible: true}, () => {
            if (isFunction(callback)) {
                callback()
            }
        })
    }

    hide(callback) {
        logger.method("Tooltip.hide")
        this.setState({isVisible: false}, () => {
            if (isFunction(callback)) {
                callback()
            }
        })
    }

    render() {
        const { content, className, children, effect, delay, position:pos, ...restProps } = this.props
        const mainClass = cx('Tooltip', {
            'Tooltip--active': this.state.isVisible
        });

        const wrapperClass = cx(className,
            "Tooltip__wrap",
            `Tooltip__wrap--${pos}`,
            `Tooltip__wrap--effect-${this.props.effect}`
        )

        return (
            <div {...restProps} className={mainClass}>
                <div className={wrapperClass}>
                    <div className='Tooltip__content'>
                        {content}
                    </div>
                </div>
                <div onMouseEnter={this.onMouseEnter} onMouseLeave={this.onMouseLeave}>
                    {children}
                </div>
            </div>
        )
    }
}
