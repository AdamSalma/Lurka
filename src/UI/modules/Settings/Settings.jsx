import './Settings.styles'
import React, { Component } from 'react'
import classes from 'classnames'

import { Setting } from './components'


export default class Settings extends Component {
    constructor({ settings, settingDetails }) {
        super();
        this.state = {
            revealMaxSettings: 3
        }

        this.uniqueGroupings = this.getUniqueGroupings(settingDetails)
    }

    getUniqueGroupings(settings) {
        logger.method("Settings::getUniqueGroupings");

        const groups = []
        for (var key in settings) {
            if (!settings.hasOwnProperty(setting))
                return
            if (!groups.includes(settings[setting].group)) {
                groups.push(settings[setting].group)
            }
        }
        return groups
    }

    render() {
        return (
            <div className="Settings">
                <div className="header">Settings</div>
                {this.createSettings()}
            </div>
        )
    }

    createSettings() {
        return this.uniqueGroupings.map( groupType => {
            // Create a group for every 'type'.
            // End structure: settings > groupType > setting
            let groupClasses = classes('group', groupType.toLowerCase())

            return (
                <div className={groupClasses} key={groupType}>
                    <span className="group-name">{groupType}</span>
                    {this.splitByGroupType(groupType)}
                </div>
            )
        })
    }

    splitByGroupType(groupType) {
        const ret = [];
        for (let setting in this._settings) {
            if (!this._settings.hasOwnProperty(setting))
                return

            let s = this._settings[setting]
            if (s.group === groupType) {
                ret.push(<Setting key={setting} setting={s} />)
            }
        }
        return ret
    }
}

