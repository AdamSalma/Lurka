import Axios from 'axios';
import {
    PROVIDER_CHANGE,
    FILTER_BOARD, FILTER_THREAD,
    SERACH_BOARD, SEARCH_THREAD,
    STATUS_UPDATE
} from '../constants';
// TODO: Filter + Search actions

export function changeProvider( provider ) {
    return (dispatch, getState) => {
        if (shouldChangeProvider(getState(), provider)) {
            console.info("Action changeProvider() to " + provider);
            dispatch({
                type: PROVIDER_CHANGE,
                payload: provider
            })
        }
    }   
}

function shouldChangeProvider( {status}, provider) {
    return status.provider !== provider
}

export function alertMessage( message ) {
    console.info(`Action alertMessage(): ${message}`);
    console.warn(message);

    return {
        type: STATUS_UPDATE,
        payload: message
    }   
}

export function clearStatus() {
    console.info(`Action clearStatus()`);
    return {
        type: STATUS_UPDATE,
        payload: ""
    }
}
