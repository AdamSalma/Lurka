import config from 'config';
import configureStore from './configure';
import { loadState, saveState, loadCache } from '~/utils/localStorage';
import { invokeAfterUninterruptedDelay } from '~/utils/throttle';

var state;

if (process.env.NODE_ENV === "production") {
    state = localStorage.loadState();
}

const store = configureStore(state);

// Save state to localstorage whenever an action is fired.
const onAnyDispatch = invokeAfterUninterruptedDelay(250,
    () => saveState(store.getState())
);

store.subscribe(onAnyDispatch);

export default store;


if (process.env.NODE_ENV === "development") {
    window.getState = store.getState;
    window.getCache = loadCache;

    console.clear();
    console.group('%cDevelopment Mode', 'color:cyan;');
    console.log('Enabled: %cwindow.getState, window.getCache', 'color: skyblue');
    console.log('State:', store.getState());
    console.log('Cache:', loadCache());

    if (window.location.search === "?react_perf") {
        console.log("React performance enabled. Open the DevTools Timeline tab and press Record.");
    }

    console.groupEnd();
}
