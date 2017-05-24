import './DualMedia.styles'
import React, { PureComponent, PropTypes } from 'react';
import classes from 'classnames'
import { bindMembersToClass } from '~/utils/react'


export default class DualMedia extends PureComponent {
    static propTypes = {
        thumbnail: PropTypes.element,
    }

    constructor(props) {
        super(props);

        this.state = {
            toggled: false
        }

        bindMembersToClass(this, 'toggle')
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.toggled !== this.state.toggled
    }

    render() {
        const {thumbnail, children, className, ...restProps} = this.props
        const dualMediaClasses = classes("dual-media", className, {
            "toggled": this.state.toggled
        })

        console.warn(this.state.toggled)
        return (
            <div {...restProps} className={dualMediaClasses} onClick={this.toggle}>
                <div className="dual-media-thumbnail">
                    {thumbnail}
                </div>
                { this.state.toggled &&
                    <div className="dual-media-children">
                        {children}
                    </div>
                }
            </div>
        )
    }

    toggle() {
        console.log("DualMedia.toggle()")
        this.setState({
            toggled: !this.state.toggled
        })
    }
}
