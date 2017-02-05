import Axios from 'axios';
import {
    PROVIDER_CHANGE,
    FILTER_BOARD, FILTER_THREAD,
    SERACH_BOARD, SEARCH_THREAD,
    ALERT_MESSAGE,

    HEADER_PANEL_OPENED, HEADER_PANEL_CLOSED,
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


const panels = ['watch', 'archive', 'sort', 'filter']
export function toggleHeaderPanel(panel) {
    if (!panels.includes(panel)) {
        throw new Error(`Panel '${panel}' doesn't exist!`);
    }

    return (dispatch, getState) => {
        if (shouldOpenPanel(getState(), panel)) {
            return dispatch({
                type: HEADER_PANEL_OPENED,
                payload: panel
            })
        } else {
            return dispatch({
                type: HEADER_PANEL_OPENED,
                payload: null
            })
        }
    }
}

function shouldOpenPanel({status}, panel){
    return status.activeHeaderPanel !== panel
}
