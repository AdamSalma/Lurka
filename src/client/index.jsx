import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import '../styles/index'
import App from './containers/App';
import configureStore from './store';
import { loadState, saveState } from './store/localStorage';

const isProd = process.env.NODE_ENV === "production"
const preloadedState = isProd ? loadState() : undefined;
const store = configureStore(preloadedState);

// Save changes to localstorage
store.subscribe( () => {
	saveState(store.getState());
})

// Enable checking the store at any point 
if (!isProd) window.storeState = store.getState;
console.info('Initial store:', store.getState());

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('#App')
);