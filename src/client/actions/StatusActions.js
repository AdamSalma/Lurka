import Axios from 'axios';
import {
    PROVIDER_CHANGE,
    FILTER_BOARD, FILTER_THREAD,
    SERACH_BOARD, SEARCH_THREAD,
    ALERT_MESSAGE,

    HEADER_PANEL_OPENED, HEADER_PANEL_CLOSED,

    APP_READY
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
export function toggleHeaderPanel({ panel, panelState=null }) {
    console.warn("toggleHeaderPanel: panel", panel, "panelState:", panelState)
    console.warn(arguments)
    if (!panel || !panels.includes(panel)) {
        throw new Error(`Unrecognised panel name: '${panel}' isn't in '${panels}'`);
    }

    return (dispatch, getState) => {
        // The desired panel is panelState; what do?
        if (panelState !== null && shouldntTogglePanelState(getState(), panel, panelState)) {
            console.warn('Panel toggle rejected; was already in requested state.')
            return 
        }

        return dispatch({
            type: HEADER_PANEL_OPENED,
            payload: shouldOpenPanel(getState(), panel) ? panel : null
        })
    }
}

function shouldOpenPanel({status}, panel){
    return status.activeHeaderPanel !== panel
}

function shouldntTogglePanelState({status}, panel, panelState){
    return panelState ? // true: keep panel open
        status.activeHeaderPanel !== panel :
        status.activeHeaderPanel === panel
        
}


export function appReady() {
    return {
        type: APP_READY
    }
}
