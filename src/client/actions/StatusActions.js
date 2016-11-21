import Axios from 'axios';
import {
    PROVIDER_CHANGE, 

    FILTER_BOARD,
    FILTER_THREAD,
    
    SERACH_BOARD,
    SEARCH_THREAD,
    
    STATUS_UPDATE
} from '../constants';

export function changeProvider( provider ) {
    return (dispatch, getState) => {
        if (getState().status.provider !== provider) {
            console.info("Action changeProvider() to " + provider);
            dispatch({
                type: PROVIDER_CHANGE,
                payload: provider
            })
        }
    }   
}

export function statusMessage( message='' ) {
    console.info(`Action updateStatusMessage(): ${message}`);
    return {
        type: STATUS_UPDATE,
        payload: message
    }   
}