import './SortPanel.styles'
import React, { Component, PropTypes } from 'react';
import cx from 'classnames'

import SortIcon from './SortIcon'

class SortPanel extends Component {
    static propTypes = {
        className: PropTypes.string,
    };

    constructor(props) {
        super(props);
        this.state = {
            activeIcon: null
        }
    }

    render() {
        // const sortClass = cx('SortPanel')
        const i = this.state.activeIcon



        return (
            <div className="SortPanel">
                <h3>Sort</h3>
                <SortIcon iconName="arrow-graph-up-right"
                    active={i === null}
                    onClick={() => this.toggleIcon(null)}
                />
                <SortIcon iconName="clock"
                    active={i === "time"}
                    onClick={() => this.toggleIcon('time')}
                />
                <SortIcon iconName="chatbox"
                    active={i === "comments"}
                    onClick={() => this.toggleIcon('comments')}
                />
                <SortIcon iconName="image"
                    active={i === "images"}
                    onClick={() => this.toggleIcon('images')}
                />
            </div>
        );
    }

    toggleIcon(icon) {
        this.setState(({ activeIcon }) => ({
            activeIcon: activeIcon === icon ? null : icon
        }))
    }
}

export default SortPanel;

