import initialState from '../initialState';
import {
    THREAD_MONITOR_ADDED,
    THREAD_MONITOR_DELETED,
    THREAD_MONITOR_UPDATED,
} from '../types'

// TODO: when a user inspects new posts - a counter of some sort; notifications

export default function (state = initialState.threadMonitor, action) {
    switch (action.type) {

        case THREAD_MONITOR_ADDED:
            const threads = [...state.threads, action.payload]
            const newPosts = action.newPosts ? action.newPosts : 0

            return Object.assign({}, state, {
                newPosts: state.newPosts + newPosts,
                threads
            })

        case THREAD_MONITOR_DELETED:

        case THREAD_MONITOR_UPDATED:
            // return {}

        default:
            return state
    }
}
