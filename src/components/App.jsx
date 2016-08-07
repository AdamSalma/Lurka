import React from 'react';
import ReactDOM from 'react';
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import Dashboard from '../pages/Dashboard';
import MemeViewer from '../pages/MemeViewer';
import Settings from '../pages/Settings';
// import fs from "fs"

// var FetchStream = require("fetch").FetchStream

export default class App extends React.Component {
    componentDidMount(){
        console.warn("Started")
        // let out = fs.createWriteStream('file.html');
        // new FetchStream("http://www.example.com/index.php")
        console.warn("Wrote file")
    }
	render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Dashboard}>
                    <Route path="memes" component={MemeViewer}></Route>
                    <Route path="settings" component={Settings}></Route>
                </Route>
            </Router>
        )
    }
}
