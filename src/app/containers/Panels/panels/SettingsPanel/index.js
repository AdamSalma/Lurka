import './styles';
import React, {Component} from 'react';
import cx from 'classnames';
// import connect from './connect';

import { ClassTransition } from '../../components';
import {
    Icon,
    Line,
    Scrollable,
    Button,
    Overlay,
    Tabs
} from '~/components'

import * as SettingTabs from './Tabs';

const i = Lurka.icons

export class SettingsPanel extends Component {
    // Used by parent to control UI
    show = (args) => this.transitioner.show(args);
    hide = (args) => this.transitioner.hide(args);
    setTransitionerRef = (ref) => this.transitioner = ref;

    // Data for <Tabs/>
    tabs = [{
        id: "account",
        title: "Account",
        page: SettingTabs.AccountTab
    }, {
        id: "board",
        title: "Board",
        page: SettingTabs.BoardTab
    }, {
        id: "thread",
        title: "Thread",
        page: SettingTabs.ThreadTab
    }, {
        id: "theme",
        title: "Theme",
        page: SettingTabs.ThemeTab
    }];

    render() {
        const classes = cx('SettingsPanel');

        const {setSetting, settings} = this.props;

        return (
            <div>
                <ClassTransition effect="fade scale" ref={this.setTransitionerRef} className={classes}>
                    <Tabs defaultTab="theme" effect="bar-slide"
                        // Dependency injection
                        settings={this.props.settings}
                        setSetting={this.props.setSetting}>
                        {this.tabs}
                    </Tabs>
                </ClassTransition>
                <Overlay isVisible style={{width: "100vw", height: "100vh"}} onClick={this.props.closePanel}/>
            </div>
        );
    }
}

// export default connect(SettingsPanel)
export default SettingsPanel
