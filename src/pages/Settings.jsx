import React from "react";
import { Link } from "react-router";

export default class Settings extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to="memes">Memes</Link></li>
                    <li><Link to="settings">Settings</Link></li>
                </ul>
                <h1>Home Page</h1>
            </div>
        )
    }
}
