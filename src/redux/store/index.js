import config from '-/config';
import configureStore from './configure';
import { loadState, saveState, loadCache } from './localStorage';
import { invokeAfterUninterruptedDelay } from '~/utils/throttle';

const state = config.env.production ? loadState() : undefined;
const store = configureStore(state);
const onDispatch = () => saveState(store.getState());
const throttle = invokeAfterUninterruptedDelay(250, onDispatch);

store.subscribe( throttle );

export default store;


if (config.env.development) {
    window.getState = store.getState;
    window.getCache = loadCache;
    console.group('%c Development Mode', 'color:cyan;');
    console.log('Enabled: %cwindow.getState, window.getCache', 'color: skyblue');
    console.log('State:', store.getState());
    console.log('Cache:', loadCache());
    console.groupEnd();
}
