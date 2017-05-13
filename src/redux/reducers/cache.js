import initialState from '../initialState';
import {
    BOARD_CACHE_LOADED,
    BOARD_CACHE_SAVED,
    BOARD_CACHE_CLEARED,

    THREAD_CACHE_LOADED,
    THREAD_CACHED,
    THREAD_CACHE_CLEARED,
} from '../types'

export default function (state = initialState.cache, action) {
    switch (action.type) {
        case BOARD_CACHE_SAVED:
            return Object.assign({}, state, Object.assign({}, state.board, {
                [action.boardID]: action.payload
            }))

        case THREAD_CACHED:
            return Object.assign({}, state, Object.assign({}, state.thread, {
                [action.threadID]: action.payload
            }))

        case BOARD_CACHE_CLEARED:
            return Object.assign({}, state, {
                board: {}
            })

        case THREAD_CACHE_CLEARED:
            return Object.assign({}, state, {
                thread: {}
            })

        default:
            return state
    }
}
