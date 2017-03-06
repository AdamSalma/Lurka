import initialState from '../constants/initialState';
import { 
    LOGO_SPIN_STARTED, 
    LOGO_SPIN_ENDED, 
    PAGE_SCROLL_STARTED, 
    PAGE_SCROLL_ENDED,
    APP_READY,
    ALERT_MESSAGE,
    PROVIDER_CHANGE,
    BOARD_CHANGE,

    HEADER_TOGGLED,
    NAVBAR_TOGGLED,

    THREAD_REQUESTED,
    THREAD_DESTROYED,

    BOARD_REQUESTED,
    BOARD_DESTROYED,

    HEADER_PANEL_OPENED,
    HEADER_PANEL_CLOSED

} from '../constants';

export default function (state = initialState.status, action) {
    switch (action.type) {

        case APP_READY:
            return Object.assign({}, state, {
                appReady: true
            })

        case HEADER_TOGGLED:
            return Object.assign({}, state, {
                isHeaderVisible: action.payload
            })

        case NAVBAR_TOGGLED:
            return Object.assign({}, state, {
                isNavbarOpen: action.payload
            })

        case PROVIDER_CHANGE:
            return Object.assign({}, state, {
                provider: action.payload
            })

        case BOARD_REQUESTED:
            return Object.assign({}, state, {
                boardID: action.payload
            })

        case THREAD_REQUESTED:
            return Object.assign({}, state, {
                threadID: action.payload
            })

        case ALERT_MESSAGE:
            return Object.assign({}, state, {
                alertMessage: action.payload
            })

        case THREAD_DESTROYED:
            return Object.assign({}, state, {
                threadID: null
            })

        case BOARD_DESTROYED:
            return Object.assign({}, state, {
                boardID: null
            })

        case HEADER_PANEL_OPENED:
            return Object.assign({}, state, {
                activeHeaderPanel: action.payload
            })

        case HEADER_PANEL_OPENED:
            return Object.assign({}, state, {
                activeHeaderPanel: null
            })

        default:
            return state
    }
}
