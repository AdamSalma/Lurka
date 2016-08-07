import React from "react";
import { Link } from "react-router";

export default class MemeViewer extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to="home">Home</Link></li>
                    <li><Link to="settings">Settings</Link></li>
                </ul>
                <h1>MemeViewer Page</h1>
            </div>
        )
    }
}
