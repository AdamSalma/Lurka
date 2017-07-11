import './DualMedia.styles'
import React, { PureComponent, PropTypes } from 'react';
import classes from 'classnames'
import { bindMembersToClass } from '~/utils/react'
import { isFunction } from '~/utils/types'


export default class DualMedia extends PureComponent {
    static propTypes = {
        thumbnail: PropTypes.element,
    }

    constructor(props) {
        super(props);

        this.state = { isToggled: false }

        bindMembersToClass(this, 'toggle')
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.isToggled !== this.state.isToggled
    }

    render() {
        const {thumbnail, children, className, ...restProps} = this.props
        const dualMediaClasses = classes("dual-media", className, {
            "toggled": this.state.isToggled
        })

        return (
            <div {...restProps} className={dualMediaClasses} onClick={this.toggle}>
                <div className="dual-media-thumbnail">
                    {thumbnail}
                </div>
                { this.state.isToggled &&
                    <div className="dual-media-children">
                        {children}
                    </div>
                }
            </div>
        )
    }

    toggle(e) {
        this.setState({
            isToggled: !this.state.isToggled
        }, () => {
            if ((this.props.onClick))
                this.props.onClick(e);
        })
    }
}
