import initialState from './initialState';
import { 
    LOGO_SPIN_STARTED, 
    LOGO_SPIN_ENDED, 
    PAGE_SCROLL_STARTED, 
    PAGE_SCROLL_ENDED,
    APP_INIT,
    STATUS_UPDATE,
    PROVIDER_CHANGE,
    BOARD_CHANGE,

    SCROLL_HEADER,

    THREAD_REQUESTED,
    THREAD_DESTROYED,

    BOARD_REQUESTED,
    BOARD_DESTROYED,
} from '../constants';

export default function (state = initialState.status, action) {
    switch (action.type) {

        // case APP_INIT:
        //     return Object.assign({}, state, {
        //         isMainPage: true
        //     })

        case PAGE_SCROLL_STARTED:
            return Object.assign({}, state, {
                isScrolling: true,
                currentPage: action.payload
            })
            
        case PAGE_SCROLL_ENDED:
            return Object.assign({}, state, {
                isScrolling: false,
                currentPage: action.payload
            })

        case SCROLL_HEADER:
            return Object.assign({}, state, {
                isHeaderVisible: action.payload
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

        case STATUS_UPDATE:
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

        default:
            return state
    }
}
