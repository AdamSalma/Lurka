import React, { Component } from 'react'
import classes from 'classnames'

import { Setting } from '../../components'


export default class Settings extends Component {
    constructor({settings}) {
        super();
        this.state = {
            revealMaxSettings: 3
        }

        // TODO: two settings for internal/client?
        // Filter disabled settings
        this._settings = {}
        for (let setting in settings) {
            if (!setting.disabled) {
                this._settings[setting] = settings[setting]
            }
        }

        console.warn(this._settings);

        this._uniqueTypes = this.getUniqueTypes(this._settings)


    }


    getUniqueTypes(settings) {
        const types = []
        for (let setting in settings) {
            if (!settings.hasOwnProperty(setting))
                return
            if (!types.includes(settings[setting].type)) {
                types.push(settings[setting].type)
            }
        }
        return types
    }

    render() {
        return (
            <div className="settings">
                <div className="header">Settings</div>
                {this.createSettings()}
            </div>
        )
    }

    createSettings() {
        return this._uniqueTypes.map( groupType => {
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
            if (s.type === groupType) {
                ret.push(<Setting key={setting} setting={s} />)
            }
        }
        return ret
    }
}

