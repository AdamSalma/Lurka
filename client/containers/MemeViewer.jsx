import React from "react";
import Velocity from 'velocity-animate';

import Board from "../components/Board";
import Thread from "../components/Thread";
import ContentOptions from "../components/ContentOptions";

export default class MemeViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            provider: "chan",
            menuIsOpen: false
        }
        this.toggleMenu = this.toggleMenu.bind(this)
    }

    render() {
        const { provider, menuIsOpen } = this.state;
        console.log("render menuIsOpen:", menuIsOpen);
        return (
            <div>
                <div className="content-overview">
                    <Board />
                    <ContentOptions 
                        provider={provider} 
                        toggleMenu={this.toggleMenu}
                        menuIsOpen={menuIsOpen}/>
                </div>
                <Thread />
            </div>
        )
    }


    toggleMenu() {
        const {menuIsOpen} = this.state;
        console.log("Toggle menu from", menuIsOpen, "into", !menuIsOpen)
        const menu = document.getElementById('content-options')
        Velocity(menu, {
            right: menuIsOpen 
                     ? "-500px" 
                     : 0
        }, {
            duration: menuIsOpen 
                        ? 400
                        : 600
        })
        this.setState({menuIsOpen: !menuIsOpen})
    }
}
