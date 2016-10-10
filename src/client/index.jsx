import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import App from './containers/App';
import configureStore from './store';
import { loadState, saveState } from './store/localStorage';

const preloadedState = loadState();
const store = configureStore(preloadedState);

// Saves changes to localstorage
store.subscribe( () => {
	saveState(store.getState());
})

// Enable checking the store start at any point 
window.storeState = store.getState();
console.info('Initial store:', store.getState());

ReactDOM.render(
    <Provider store={store}>
        <App/>
    </Provider>,
    document.querySelector('#App')
);