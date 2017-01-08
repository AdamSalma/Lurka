import React, { Component } from 'react'
import classNames from 'classnames'

import Setting from '../Setting'


export default class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            revealMaxSettings: 3
        }
        this.settings = props.settings.filter( s=> !s.disabled )
        this.settingsTypes = this.uniqueTypes(this.settings)
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
        return this.settingsTypes.map( groupType => {
            // Create a group for every 'type'. End structure: settings > groupType > setting
            let classes = classNames('group', groupType.toLowerCase())

            return (
                <div className={classes} key={groupType}>
                    <span className="group-name">{groupType}</span>
                    {this.splitByGroupType(groupType)}
                </div>
            )
        })
    }

    splitByGroupType(groupType) {
        return this.settings.map( setting => {
            if (setting.type === groupType) {
                return <Setting key={setting.key} setting={setting} />
            }
        })
    }

    uniqueTypes(settings) {
        const types = []
        settings.map( setting => {
            if (!types.includes(setting.type)) {
                types.push(setting.type)
            }
        })
        return types
    }
}
