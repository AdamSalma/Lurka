import config from '-/config';
import configureStore from './configure';
import { loadState, saveState } from './localStorage';
import { invokeAfterUninterruptedDelay } from '~/utils/throttle';

const state = config.isProduction ? loadState() : undefined;
const store = configureStore(state);
const onDispatch = () => saveState(store.getState());
const throttle = invokeAfterUninterruptedDelay(250, onDispatch);

store.subscribe( throttle );

export default store;


if (!config.isProduction) {
    window.getState = store.getState;
    console.group('%c Development Mode', 'color:cyan;');
    console.log('Added window.getState');
    console.log('State:', store.getState());
    console.groupEnd();
}
