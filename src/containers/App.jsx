import React from 'react';
import ReactDOM from 'react';
import { Router, Route, IndexRoute, hashHistory } from "react-router";

import '../index.scss';
import Dashboard from './Dashboard';
import Layout from './Layout';
import MemeViewer from './MemeViewer';
import Settings from './Settings';

export default class App extends React.Component {
	render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={Layout}>
                    <IndexRoute component={Dashboard}></IndexRoute>
                    <Route path="memes" component={MemeViewer}></Route>
                    <Route path="settings" component={Settings}></Route>
                </Route>
            </Router>
        )
    }
}
