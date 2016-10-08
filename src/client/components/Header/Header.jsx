import React from 'react';
import { Link } from 'react-router';
import Velocity from 'velocity-animate';
// import NavBar from './NavBar';  // TODO - incorporate this
import classNames from "classnames";

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isNavbarVisible: true,
            activeLink: 0
        }
        this.makeActiveLink = this.makeActiveLink.bind(this);
        this.makeUnactiveAll = this.makeUnactiveAll.bind(this);
    }

    render() {
        const { activeLink } = this.state;

        return (
            <nav ref="navbar">
                <ul>
                    <li><Link
                        onClick={this.makeActiveLink}
                        className={"route-link"}
                        to="/">Dashboard
                    </Link></li>
                    <li><Link
                        onClick={this.makeActiveLink}
                        className={"route-link"}
                        to="/memes">Memes
                    </Link></li>
                    <li><Link
                        onClick={this.makeActiveLink}
                        className={"route-link"}
                        to="/settings">Settings
                    </Link></li>
                </ul>
            </nav>
        )
    }

    makeActiveLink( e ) {
        this.makeUnactiveAll()
        // add to current
        const { classList } = e.target;
        if (classList.contains('active')) return classList.remove('active');
        classList.add('active')
    }

    makeUnactiveAll( ) {
        const { navbar } = this.refs;
        var lis = navbar.children[0].children
        for (let i = 0; i<lis.length; i++) {
            lis[i].classList.remove('active')
        }
    }
}
