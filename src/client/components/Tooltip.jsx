import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

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
        const { className, content } = this.props
        const contentClasses = classNames("tooltip-content", {
            'tooltip-active': this.state.isVisible
        })

        return <div className={`tooltip ${className}`}>
            <div
                className="tooltip-target"
                onMouseEnter={this.showTooltip}
                onMouseLeave={this.hideTooltip}
            >
                {this.props.children}
            </div>
            <div className={contentClasses}>
                {this.props.content}
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
