import 'babel-polyfill';
import '../styles/index';
import './vendor/nanoscroller';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import AppContainer from './pages/App';
import configureStore from './store';
import { loadState, saveState } from './store/localStorage';
import { appReady } from './actions'

const isProd = process.env.NODE_ENV === "production"
const preloadedState = isProd ? loadState() : undefined;
const store = configureStore(preloadedState);

// Save changes to localstorage each time an action is dispatched
store.subscribe( () => {
	saveState(store.getState());
})

window.AppReady = () => store.dispatch(appReady())

// Enable checking the store at any point 
if (!isProd) 
    window.getState = store.getState;

console.info('Initial store:', store.getState());

ReactDOM.render(
    <Provider store={store}>
        <AppContainer/>
    </Provider>,
    document.querySelector('#App')
);
