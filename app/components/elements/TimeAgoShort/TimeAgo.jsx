import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames';
import { getShortTimeAgo } from '~/utils/time';

class TimeAgo extends PureComponent {
    constructor(props) {
        super(props)
        this.update = this.update.bind(this)
        this._interval = setInterval(this.update, 1000)

        this.state = {
            clicked: false
        }
    }

    componentWillUnmount() {
        clearInterval(this._interval);
    }

    render() {
        const { className, time, ...restProps} = this.props;

        return <span className={cx("TimeAgoShort", className)} {...restProps}>
            {getShortTimeAgo(time)}
        </span>
    }

    update() {
        this.forceUpdate();
    }
}

export default TimeAgo
