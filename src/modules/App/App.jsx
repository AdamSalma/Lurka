import './App.styles'
import React, { Component } from "react";
import { Provider } from 'react-redux';

import { appReady } from '~/redux/actions';
import store from '~/redux/store'
import Views from '~/views'
import Preloader from './Preloader'

// Setup preloader trigger
window.appReady = () => store.dispatch(appReady());

const App = () => {
    return (
        <div>
            <Views/>
            <Preloader/>
        </div>
    )
}

const AppContainer = () => {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    )
}

export default AppContainer
