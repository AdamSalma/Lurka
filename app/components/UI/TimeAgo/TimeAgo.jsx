import './TimeAgo.styles'

import React, { PureComponent, PropTypes } from 'react';
import moment from 'moment'

import {Tooltip} from '~/components/UI'

export default class TimeAgo extends PureComponent {
    constructor(props) {
        super(props)
        this.update = this.update.bind(this)
        this.toggleFormat = this.toggleFormat.bind(this)
        this._interval = setInterval(this.update, props.refreshRate)

        this.state = {
            clicked: false
        }
    }

    componentWillUnmount() {
        clearInterval(this._interval)
    }

    render() {
        const {canToggle, toggledFormat, agoSuffix} = this.props
        const time = moment(this.props.time)

        return <span className="TimeAgo" onClick={this.toggleFormat}>
            {this.state.clicked && canToggle ?
                time.format(toggledFormat) : time.fromNow(agoSuffix)
            }
        </span>
    }

    update() {
        this.forceUpdate()
    }

    toggleFormat() {
        this.setState(state => ({
            clicked: !state.clicked
        }))
    }
}

TimeAgo.defaultProps = {
    refreshRate: 60000,
    // toggledFormat: 'dddd [at] hh:mma',
    toggledFormat: 'HH:mm:ss[,] dddd Do MMM YYYY',
    canToggle: true,
    agoSuffix: false
}

TimeAgo.propTypes = {
    time: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.number
    ]),
    refreshRate: PropTypes.number,
    toggledFormat: PropTypes.string,
    canToggle: PropTypes.bool,
    agoSuffix: PropTypes.bool,
}
