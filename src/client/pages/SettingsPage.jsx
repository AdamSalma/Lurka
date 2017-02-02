import React, { Component } from "react";

export default class Settings extends Component {
    render() {
        return (
            <div className="page page-settings">
                <h2>This is SettingsPage</h2>
                {this.props.children}
            </div>
        )
    }
}
