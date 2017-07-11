import './App.styles.sass';
import React, { Component } from 'react';
import { Provider } from 'react-redux';

import { appReady } from '~/redux/actions';
import store from '~/redux/store';
import Views from '~/views';
import Preloader from './Preloader';
import {Alert} from '~/components';

// Setup preloader trigger
window.appReady = () => store.dispatch(appReady());

const App = () => (
    <main>
        <Views />
        <Preloader />
        <Alert position="bottom left" />
    </main>
);

const AppContainer = () => {
    return (
        <Provider store={store}>
            <App/>
        </Provider>
    );
};

export default AppContainer;
