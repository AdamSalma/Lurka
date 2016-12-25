import initialState from './initialState';
import { 
    BOARD_REQUESTED, 
    BOARD_LOADED, 
    BOARD_DESTROYED, 
    BOARD_SCROLLED_BOTTOM,
    BOARD_FILTER
} from '../constants'

export default function (state = initialState.board, action) {
    switch (action.type) {

        case BOARD_REQUESTED:
            return Object.assign({}, state, {
                isFetching: true,
                requestType: action.type  // for logging error to user...?
            })

        case BOARD_LOADED:
            return Object.assign({}, state, {
                posts: action.payload,
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
