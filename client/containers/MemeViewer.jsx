import React from "react";
import Board from "../components/Board";
import Thread from "../components/Thread";
import ContentOptions from "../components/ContentOptions";

export default class MemeViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            provider: "chan",
            menuOpen: false
        }
        this.toggleMenu = this.toggleMenu.bind(this)
    }

    render() {
        const { provider, menuOpen } = this.state;
        console.log("render menuOpen:", menuOpen)
        return (
            <div>
                <div className="content-overview">
                    <ContentOptions 
                        provider={provider} 
                        toggleMenu={this.toggleMenu}/>
                    <Board />
                </div>
                <Thread />
            </div>
        )
    }


    toggleMenu() {
        const {menuOpen} = this.state;
        console.log("Toggle menu from", menuOpen, "into", !menuOpen)
        this.setState({menuOpen: !menuOpen})
    }
}
