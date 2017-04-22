import React, { Component } from "react";

import {
    Router,
    Route,
    IndexRoute,
    hashHistory
} from "react-router";

import HomeView   from '~/views/HomeView';
import ContentView from '~/views/ContentView';
import SettingsView from '~/views/SettingsView';

const Routes = () => {
    return (
        <Provider store={store}>
            <Router history={hashHistory}>
                <Route exact path="/" component={HomeView} />
                <Route path='content' component={ContentView}/>
                <Route path='settings' component={SettingsView}></Route>
            </Router>
        </Provider>
    )
}

export default Routes
