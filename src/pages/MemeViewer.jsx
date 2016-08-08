import React from "react";
import { Link } from "react-router";

import Board from "../components/Board";
import Thread from "../components/Thread";

export default class MemeViewer extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div className="MemeViewer">
                <Board/>
                <Thread/>
            </div>
        )
    }
}
