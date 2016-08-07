import React from "react";
import { Link } from "react-router";
import Board from "../components/Board"
import Thread from "../components/Thread"
import Header from "../components/Header"
import Footer from "../components/Footer"

export default class MemeViewer extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <div className="MemeViewer">
                    <h1>MemeViewer Page</h1>
                    <Board/>
                    <Thread/>
                </div>
            </div>
        )
    }
}
