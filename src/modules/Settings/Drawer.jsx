import './Drawer.styles';
import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames'

import {
    LogoText, Icon
} from '~/components'

import { invokeAfterUninterruptedDelay } from '~/utils/throttle'
import { bindMembersToClass } from '~/utils/react'

import Sort from './Sort'
import { onSettingsToggle } from '~/events/subscribers';

class Drawer extends PureComponent {
    constructor(props) {
        super(props);
        this.throttleSearch = invokeAfterUninterruptedDelay(200, this.handleSearch)
        this.state = {
            isSettingsOpen: props.isSettingsOpen || false,
            hideDuration: 600,
            showDuration: 600,
            hideEasing:   [0.23, 1, 0.32, 1],
            showEasing:   [0.23, 1, 0.32, 1]
        }

        bindMembersToClass(this, 'toggleViewState');
    }

    render() {
        const { isDrawerOpen } = this.props

        return (
            <div className='Drawer' ref={ref => this._drawer = ref}>
                <div className="header">
                </div>
                <div className="container">
                    <div className="content">
                        <Sort
                            className="Drawer__Panel"
                        />
                    </div>
                    <div className="footer">
                        <LogoText />
                        <Icon name="ios-lightbulb"/>
                        <Icon name="android-settings"/>
                    </div>
                </div>
            </div>
        );
    }

    @onSettingsToggle
    onToggle({ override, callback }) {
        logger.method('ContentView.onToggle', arguments)
        if (override !== undefined) {
            override ? this.hide() : this.show();
        } else {
            this.state.isSettingsOpen ? this.hide() : this.show();
        }
    }

    hide() {
        logger.log("Drawer.hide()")
        this.animate({
            translateX: 0,
            translateZ: 0
        }, {
            duration: this.state.hideDuration,
            easing:   this.state.hideEasing,
            complete: this.toggleViewState
        });
    }

    show() {
        logger.log("Drawer.hide()")
        this.animate({
            translateX: "100%",
            translateZ: 0
        }, {
            duration: this.state.showDuration,
            easing:   this.state.showEasing,
            complete: this.toggleViewState
        });
    }

    toggleViewState() {
        this.setState({
            isSettingsOpen: !this.state.isSettingsOpen
        })
    }

    animate(styles, options) {
        this._drawer && $(this._drawer).velocity(styles, options);
    }
}

export default Drawer;
