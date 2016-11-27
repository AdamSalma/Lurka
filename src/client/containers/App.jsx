import React, { Component } from "react";

import { Router, Route, IndexRoute, hashHistory } from "react-router";

import HomePanel from './HomePanel';
import ContentPanel from './ContentPanel';
import SettingsPanel from './SettingsPanel';

export default class App extends Component {
    render() {
        return (
            <div id="pages">
                <HomePanel/>
                <ContentPanel/>
                <SettingsPanel/>
        	</div>
        )
    }
}