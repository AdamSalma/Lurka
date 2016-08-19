import React from "react";
import { Link } from "react-router";

export default class Settings extends React.Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/memes">Memes</Link></li>
                    <li><Link to="/">Dashboard</Link></li>
                </ul>
                <h1>Settings Page</h1>
                {this.props.children}
            </div>
        )
    }
}
