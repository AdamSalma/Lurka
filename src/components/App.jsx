import React from 'react';
import ReactDOM from 'react';
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import { Dashboard } from '../pages/Dashboard';
import { MemeViewer } from '../pages/MemeViewer';
import { Settings } from '../pages/Settings';

export default class App extends React.Component {
	render() {
        <Router history={hashHistory}>
            <Route path="/" component={Dashboard}>
                <Route path="memes" component={MemeViewer}></Route>
                <Route path="settings " component={Settings}></Route>
            </Route>
        </Router>
    }
}
