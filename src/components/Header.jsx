import React from 'react';
import { Link } from 'react-router';
import Velocity from 'velocity-animate';
// import NavBar from './NavBar';  // TODO - incorporate this
import classNames from "classnames";

console.log(classNames)
export default class Header extends React.Component {
    constructor(props) {
        super(props);
        console.log(props);
        console.log(this);
        console.log(this.key);
        this.state = {
            isNavbarVisible: true,
            activeLink: 0
        }
        this.makeActiveLink.bind(this, this.props);
    }

    componentDidMount() {
        console.log("componentWillMount")
        const { navbar } = this.refs;
        var lis = navbar.children[0].children
        console.log(lis)
        lis.map( li => {
            li.classList.remove('active')
        })
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
        const { classList } = e.target;
        console.log('e is', e);
        console.warn(this);
        if (classList.contains('active')) return classList.remove('active');
        classList.add('active')
    }
}
