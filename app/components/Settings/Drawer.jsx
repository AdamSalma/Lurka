import './Drawer.styles';
import React, { PureComponent, PropTypes } from 'react';
import cx from 'classnames'

import {
    LogoText, Icon, Container
} from '~/components/UI'

import { invokeAfterUninterruptedDelay } from '~/utils/throttle'
import { bindMembersToClass } from '~/utils/react'

import Settings from './Settings'
import { onSettingsToggle } from '~/events/subscribers';

const { settingsWidth } = Lurka.settings;


class Drawer extends PureComponent {
    constructor(props) {
        super(props);
        this.throttleSearch = invokeAfterUninterruptedDelay(200, this.handleSearch)
        this.isSettingsOpen = props.isSettingsOpen || false;
        this.state = {
            closeDuration: 600,
            closeEasing:   [0.23, 1, 0.32, 1],
            openDuration: 600,
            openEasing:   [0.23, 1, 0.32, 1]
        }

        bindMembersToClass(this, 'toggleViewState');
    }

    render() {
        const { isDrawerOpen } = this.props

        return (
            <div className='Drawer' ref={ref => this._drawer = ref}>
                <div className="header">
                </div>
                <Container className="container">
                    <Settings settings={this.props.settings} settingDetails={this.props.settingDetails} />
                </Container>
            </div>
        );
    }

    @onSettingsToggle
    onToggle(shouldOpen) {
        window.openDrawer = this.open.bind(this);
        window.closeDrawer = this.close.bind(this);
        logger.method('Drawer.onSettingsToggle', "shouldOpen is", shouldOpen)
        if (shouldOpen === this.isSettingsOpen) {
            return
        }

        if (!shouldOpen) {
            shouldOpen = !this.isSettingsOpen
        }

        shouldOpen ? this.open() : this.close();
    }

    open() {
        logger.method("Drawer.open")
        this.toggleViewState();
        this.animate({
            translateX: 0,
            translateZ: 0
        }, {
            duration: this.state.openDuration,
            easing:   this.state.openEasing
        });
    }

    close() {
        logger.method("Drawer.close")
        this.toggleViewState();
        this.animate({
            translateX: settingsWidth,
            translateZ: 0
        }, {
            duration: this.state.closeDuration,
            easing:   this.state.closeEasing
        });
    }

    toggleViewState() {
        this.isSettingsOpen = !this.isSettingsOpen;
    }

    animate(styles, options) {
        this._drawer && $(this._drawer).stop().velocity(styles, options);
    }
}

export default Drawer;
