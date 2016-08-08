import React from 'react';
import { Link } from 'react-router';
// import NavBar from './NavBar';  // TODO - incorporate this

export default class Header extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav>
                <ul>
                    <li><Link className="route-link" to="/">Dashboard</Link></li>
                    <li><Link className="route-link" to="/settings">Settings</Link></li>
                    <li><Link className="route-link" to="/memes">Memes</Link></li>
                </ul>
            </nav>
        )
    }
}
