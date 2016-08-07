import React from "react";
import { Link } from "react-router";

import Header from "../components/Header"
import Footer from "../components/Footer"

export default class MemeViewer extends React.Component {
    constructor() {
        super()
    }

    render() {
        return (
            <div>
                <Header/>
                {this.props.children}
                <Footer/>
            </div>
        )
    }
}
