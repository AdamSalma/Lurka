import Axios from 'axios';
import {
    PROVIDER_CHANGE, 
    HEADER_ANIMATE,
    LOGO_SPIN,
    FILTER_BOARD,
    FILTER_THREAD,
    SERACH_BOARD,
    SEARCH_THREAD
} from '../constants';

export function toggleHeaderAnimation(){
    console.info('toggleHeaderAnimation');
    return dispatch => {
        dispatch({
            type: HEADER_ANIMATE
        })
    }
}

export function changeProvider({ provider }) {
    console.info("Action changeProvider() to " + provider);
    return dispatch => {
        dispatch({
            type: PROVIDER_CHANGE,
            payload: provider
        })
    }   
}