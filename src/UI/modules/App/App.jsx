import './App.styles.sass';
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { appReady } from '~/redux/actions';
import store from '~/redux/store';
import Views from '~/views';
import Preloader from './Preloader';
import Alert from '~/components/Alert';

// Setup preloader trigger
window.appReady = () => store.dispatch(appReady());

const App = () => {
    return (
        <main>
            <Views
                homeID='HomeView'
                contentID='ContentView'
                settingsID='SettingsView'
            />
            <Preloader />
            <Alert position="bottom left" />
        </main>
    );
};

const AppContainer = () => {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    );
};

export default AppContainer;
