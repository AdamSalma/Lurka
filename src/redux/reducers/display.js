import initialState from '../initialState';
import {
    APP_READY,
    HEADER_TOGGLED,
    DRAWER_TOGGLED,
    NAVBAR_TOGGLED,
    HEADER_PANEL_OPENED,
    THREAD_REQUESTED,
    THREAD_CACHE_LOADED,
    THREAD_DESTROYED,
    HEADER_PANEL_CLOSED
} from '../types';


export default function (state = initialState.display, action) {
    switch (action.type) {

        case APP_READY:
            return Object.assign({}, state, {
                isAppReady: true
            })

        case HEADER_TOGGLED:
            return Object.assign({}, state, {
                isHeaderVisible: action.payload
            })

        case DRAWER_TOGGLED:
            return Object.assign({}, state, {
                isDrawerOpen: action.payload
            })

        case NAVBAR_TOGGLED:
            return Object.assign({}, state, {
                isNavbarOpen: action.payload
            })

        case THREAD_REQUESTED:
        case THREAD_CACHE_LOADED:
            return Object.assign({}, state, {
                isThreadOpen: true
            })

        case THREAD_DESTROYED:
            return Object.assign({}, state, {
                isThreadOpen: false
            })

        case HEADER_PANEL_OPENED:
            return Object.assign({}, state, {
                activeHeaderPanel: action.payload
            })

        case HEADER_PANEL_CLOSED:
            return Object.assign({}, state, {
                activeHeaderPanel: null
            })

        default:
            return state
    }
}
