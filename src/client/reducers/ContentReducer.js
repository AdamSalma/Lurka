import initialState from './initialState';
import { 
    BOARD_LOADED, 
    BOARD_REQUESTED, 
    BOARD_SCROLLED_BOTTOM,

    BOARD_LIST_LOADED, 
    BOARD_LIST_REQUESTED,

    THREAD_LOADED, 
    THREAD_REQUESTED, 
    THREAD_DESTROYED,

    PROVIDER_CHANGED,
    BOARD_CHANGED,
    THREAD_CHANGE
} from '../constants'

export default function (state = initialState.content, action) {
    switch (action.type) {

        case BOARD_REQUESTED:
        case THREAD_REQUESTED:
        case BOARD_LIST_REQUESTED:
            return Object.assign({}, state, {
                isFetching: true,
                requestType: action.type  // for logging error to user...?
            })

        case BOARD_LOADED:
            return Object.assign({}, state, {
                board: {
                    posts: action.payload,
                    limit: initialState.content.board.limit
                },
                isFetching: false
            })

        case BOARD_SCROLLED_BOTTOM:
            const { board } = state;
            board.limit = action.payload

            return Object.assign({}, state, {board})

        case BOARD_LIST_LOADED:
            const boardlist = {}[action.key] = action.payload

            return Object.assign({}, state, {
                boardlist,
                isFetching: false
            })

        case THREAD_LOADED:
            return Object.assign({}, state, {
                thread: {posts: action.payload},
                isFetching: false
            })

        case THREAD_DESTROYED:
            const history = {}[state.threadID] = state.thread.posts
            return Object.assign({}, state, {
                thread: { history, posts: [] }
            })

        case PROVIDER_CHANGED:
            return Object.assign({}, state, {
                provider: action.payload
            })

        case BOARD_CHANGED:
            return Object.assign({}, state, {
                boardID: action.payload
            })

        case THREAD_CHANGE:
            return Object.assign({}, state, {
                threadID: action.payload
            })

        default:
            return state
    }
}
