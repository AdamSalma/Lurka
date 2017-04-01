import 'babel-polyfill';
import '../styles/index';
import './vendor/polyfills';
import './vendor/nanoscroller';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppContainer from './pages/App';

import store from './redux/store'
import { appReady } from './redux/actions'

// Setup trigger for preloader on app ready
window.AppReady = () => store.dispatch(appReady())

ReactDOM.render(
    <Provider store={store}>
        <AppContainer/>
    </Provider>,
    document.querySelector('#App')
);
