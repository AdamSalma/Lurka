import {
    HEADER_PANEL_OPENED, 
    HEADER_PANEL_CLOSED,
} from '../types';

const panels = ['watch', 'archive', 'theme']

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
