import initialState from '../initialState';
import { 
    ALERT_MESSAGE,
    PROVIDER_CHANGE,
    BOARD_CHANGE,

    THREAD_REQUESTED,
    THREAD_INVALIDATED,
    THREAD_DESTROYED,

    BOARD_REQUESTED,
    BOARD_DESTROYED
} from '../types';

export default function (state = initialState.status, action) {
    switch (action.type) {

        case ALERT_MESSAGE:
            return Object.assign({}, state, {
                alertMessage: action.payload
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

        case THREAD_INVALIDATED:
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
