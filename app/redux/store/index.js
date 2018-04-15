/**
 * Sets up the redux store using previous session data and exports it
 */

import config from 'config';
import configureStore from './configure';
import * as localStorage from '~/utils/localStorage';
import { invokeAfterUninterruptedDelay } from '~/utils/throttle';
import rootReducer from '../reducers';

const initialState = localStorage.load("state");

const store = configureStore(rootReducer, initialState);

// Save state to localstorage whenever an action is fired.
const onAnyDispatch = invokeAfterUninterruptedDelay(250,
    () => localStorage.save("state", store.getState())
);

store.subscribe(onAnyDispatch);

export default store;


if (process.env.NODE_ENV === "development") {
    window.getState = store.getState;
    window.getCache = () => localStorage.load("cache");

    console.clear();
    console.group('%cDevelopment Mode', 'color:cyan;');
    console.log('Enabled: %cwindow.getState, window.getCache', 'color: skyblue');
    console.log('State:', window.getState());
    console.log('Cache:', window.getCache());

    if (window.location.search === "?react_perf") {
        console.log("React performance enabled. Open the DevTools Timeline tab and press Record.");
    }

    console.groupEnd();
}
