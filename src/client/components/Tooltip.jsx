import React, { Component, PropTypes } from 'react';
import classes from 'classnames';

export default class Tooltip extends Component {
    constructor(props) {
        super(props);
        this.showTooltip = this.showTooltip.bind(this)
        this.hideTooltip = this.hideTooltip.bind(this)
        this.state = {
            isVisible: false
        }
    }

    showTooltip() {
        this.setState({
            isVisible: true
        })
    }

    hideTooltip() {
        this.setState({
            isVisible: false
        })
    }

    render() {
        const { className, content, children } = this.props
        const contentClasses = classes("tooltip-content", {
            'tooltip-active': this.state.isVisible
        })

        return <div className={[
            'tooltip', 
            className
        ].join(' ')}>
            <div className={contentClasses}>
                {content}
            </div>
            <div className="tooltip-target"
            onMouseEnter={this.showTooltip}
            onMouseLeave={this.hideTooltip}>
                {children}
            </div>
        </div>
    }
}

Tooltip.defaultProps = {
    className: ''
}

Tooltip.propTypes = {
    className: PropTypes.string,
    content: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.element
    ])
}
