import './SortPanel.styles'
import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames'

import SortIcon from './SortIcon'
import {RadioGroup} from '~/components/UI'

// TODO: have draawer panels as individia; and make
//
class SortPanel extends PureComponent {
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
        const { isThreadOpen } = this.props

        return (
            <div className="SortPanel">
                <h3>Sort</h3>
                {/*<ul>
                    <li>Higher ratio of images</li>
                    <li>Latest reply</li>
                    <li>Creation date</li>
                    <li>Most replies</li>
                </ul>*/}
                <RadioGroup activeChild={0}>
                    <div>Higher ratio of images</div>
                    <div>Latest reply</div>
                    <div>Creation date</div>
                    <div>Most replies</div>
                </RadioGroup>
                {/*<SortIcon iconName="arrow-graph-up-right"
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
                />*/}
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

