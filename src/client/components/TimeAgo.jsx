import React, { Component, PropTypes } from 'react';
import moment from 'moment'
import Tooltip from './Tooltip'

export default class TimeAgo extends Component {
    constructor(props) {
        super(props)
        this.update = this.update.bind(this)
        this._interval = setInterval(this.update, props.refreshRate)
    }

    componentWillUnmount() {
        clearInterval(this._interval)    
    }

    render() {
        const time = moment(this.props.time);
        return (
            <Tooltip 
                content={time.format(this.props.format)}
                className="timeago"
            >
                {time.fromNow()}
            </Tooltip>
        )
    }

    update() {
        this.forceUpdate()
    }
}

TimeAgo.defaultProps = {
    refreshRate: 60000,
    format: 'dddd [at] hh:mma'
}

TimeAgo.propTypes = {
    time: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.number
    ]),
    refreshRate: PropTypes.number,
    format: PropTypes.string
}
