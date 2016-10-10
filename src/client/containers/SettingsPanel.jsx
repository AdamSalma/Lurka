import React from "react";
import { Link } from "react-router";

export default class Settings extends React.Component {
    render() {
        return (
            <div className="page page-settings">
                <h2>This is SettingsPanel</h2>
                {this.props.children}
            </div>
        )
    }
}
