import React, { Component } from "react";

import { Router, Route, IndexRoute, hashHistory } from "react-router";

import HomePanel from './HomePanel';
import ContentPanel from './ContentPanel';
import SettingsPanel from './SettingsPanel';

export default class App extends Component {
    render() {
        return (
        	<Router history={hashHistory}>
        		<Route path="/" component={HomePanel}>
        			<Route path='content' component={ContentPanel}>
        				<Route path='settings' component={SettingsPanel}></Route>
        			</Route>
        		</Route>
        	</Router>
        )
    }
}