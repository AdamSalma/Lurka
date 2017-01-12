import Axios from 'axios';
import {
    PROVIDER_CHANGE,
    FILTER_BOARD, FILTER_THREAD,
    SERACH_BOARD, SEARCH_THREAD,
    ALERT_MESSAGE
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
    console.info(`Action alertMessage(): ${message.message}`);

    return {
        type: ALERT_MESSAGE,
        payload: message
    }   
}
