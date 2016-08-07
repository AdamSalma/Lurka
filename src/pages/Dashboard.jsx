import React from "react";
import { Link } from "react-router";

export default class Dashboard extends React.Component {
    constructor(){
        super();
        this.navigate = this.navigate.bind(this);
    }
    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/memes">Memes</Link></li>
                    <li><Link to="/settings">Settings</Link></li>
                </ul>
                <h1>Dashboard Page</h1>
                {this.props.children}
                <button onClick={this.navigate}>Navigate</button>
            </div>
        )
    }

    navigate(){
        console.log(this.props)
    }
}
