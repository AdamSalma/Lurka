import configureStore from './configure';
import { loadState, saveState } from './localStorage';

const prodEnv = process.env.NODE_ENV === "production"
const state = config.prodEnv ? loadState() : undefined;
const store = configureStore(state);

if (!config.prodEnv) {
    // For debugging
    window.getState = store.getState;
    console.info('Initial Store:', store.getState());
}

// Save changes to localstorage each time an action is dispatched
store.subscribe( () => {
    saveState(store.getState());
});

export default store;
