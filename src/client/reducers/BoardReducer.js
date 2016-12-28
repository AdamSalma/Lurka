import initialState from './initialState';
import { 
    BOARD_REQUESTED, 
    BOARD_LOADED, 
    BOARD_DESTROYED, 
    BOARD_SCROLLED_BOTTOM,
    BOARD_FILTER,
    BOARD_INVALIDATED
} from '../constants'

export default function (state = initialState.board, action) {
    switch (action.type) {

        case BOARD_REQUESTED:
            return Object.assign({}, state, {
                isFetching: true,
                didInvalidate: false
            })

        case BOARD_INVALIDATED:
            return Object.assign({}, state, {
                didInvalidate: true
            })

        case BOARD_LOADED:
            return Object.assign({}, state, {
                posts: action.posts,
                receivedAt: action.receivedAt,
                isFetching: false
            })

        case BOARD_DESTROYED:
            return Object.assign({}, state, {
                posts: []
            })

        case BOARD_SCROLLED_BOTTOM:
            return Object.assign({}, state, {
                limit: action.payload
            })

        case BOARD_FILTER:
            return Object.assign({}, state, {
                filterWord: action.payload || null
            })

        default:
            return state
    }
}
