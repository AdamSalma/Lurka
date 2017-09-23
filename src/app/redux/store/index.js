import config from 'config';
import configureStore from './configure';
import { loadState, saveState, loadCache } from '~/utils/localStorage';
import { invokeAfterUninterruptedDelay } from '~/utils/throttle';

const state = config.env.production ? loadState() : undefined;
// const state = loadState();
const store = configureStore(state);
const onDispatch = () => saveState(store.getState());
const throttle = invokeAfterUninterruptedDelay(250, onDispatch);

store.subscribe( throttle );

export default store;


if (config.env.development) {
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
