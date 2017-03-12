import initialState from '../constants/initialState';
import { 
    THREAD_LOADED, 
    THREAD_REQUESTED, 
    THREAD_DESTROYED,
    THREAD_INVALIDATED,
    THREAD_LOADED_FROM_HISTORY
} from '../constants'

export default function (state = initialState.thread, action) {
    switch (action.type) {

        case THREAD_REQUESTED:
            return Object.assign({}, state, {
                isFetching: true,
                isActive: true,
                didInvalidate: false

            })

        case THREAD_INVALIDATED:
            return Object.assign({}, state, {
                didInvalidate: true,
                isFetching: false
            })

        case THREAD_LOADED:
            return Object.assign({}, state, {
                posts: action.posts,
                isFetching: false,
                receivedAt: action.receivedAt
            })

        case THREAD_DESTROYED:
            return Object.assign({}, state, {
                posts: [],
                isActive: false
            })

        case THREAD_LOADED_FROM_HISTORY:
            return Object.assign({}, state, action.payload, {
                isActive: true
            })

        default:
            return state
    }
}
