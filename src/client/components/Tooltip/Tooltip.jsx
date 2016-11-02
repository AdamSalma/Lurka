import React, { Component } from 'react';
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
		const content = classNames("tooltip-content", {
			'tooltip-active': this.state.isVisible
		})

		return (
			<div className={this.props.className || "tooltip"}>
				<div
					className="tooltip-target"
					onMouseEnter={this.showTooltip}
					onMouseLeave={this.hideTooltip}
				>
					{this.props.children}
				</div>
				<div className={content}>
					{this.props.content}
				</div>
			</div>
		)
	}
}


