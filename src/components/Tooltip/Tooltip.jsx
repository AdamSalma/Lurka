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
        const { content, className, children, effect, position:pos, ...restProps } = this.props
        const mainClass = cx('Tooltip', {
            'Tooltip--active': this.state.isVisible
        });

        const wrapperClass = cx(className,
            "Tooltip__wrap",
            `Tooltip__wrap--${pos}`,
            `Tooltip__wrap--effect-${this.props.effect}`
        )

        return (
            <div {...restProps}
            className={mainClass}
            onMouseEnter={this.onMouseEnter}
            onMouseLeave={this.onMouseLeave}>
                <div className={wrapperClass}>
                    <div className='Tooltip__content'>
                        {content}
                    </div>
                </div>
                {children}
            </div>
        )
    }
}
