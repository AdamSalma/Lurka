import Axios from 'axios';
import {
    PROVIDER_CHANGE, 
    LOGO_SPIN,
    FILTER_BOARD,
    FILTER_THREAD,
    SERACH_BOARD,
    SEARCH_THREAD
} from '../constants';

export function changeProvider({ provider }) {
    console.info("Action changeProvider() to " + provider);
    return dispatch => {
        dispatch({
            type: PROVIDER_CHANGE,
            payload: provider
        })
    }   
}