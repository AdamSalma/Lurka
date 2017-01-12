import initialState from '../constants/initialState';
import { 
    BOARD_REQUESTED, 
    BOARD_LOADED, 
    BOARD_DESTROYED, 
    BOARD_SCROLLED_TO_BOTTOM,
    BOARD_INVALIDATED,
    BOARD_SEARCHED,
    ADD_FILTER,
    REMOVE_FILTER,
    BOARD_LOADED_FROM_HISTORY
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

        case BOARD_SCROLLED_TO_BOTTOM:
            return Object.assign({}, state, {
                limit: action.payload
            })

        case BOARD_SEARCHED:
            return Object.assign({}, state, {
                searchWord: action.payload || null
            })

        case BOARD_LOADED_FROM_HISTORY:
            return Object.assign({}, state, action.payload)

        case ADD_FILTER:
            return Object.assign({}, state, {
                filterWords: [...state.filterWords, action.payload]
            })

        case REMOVE_FILTER:
            return Object.assign({}, state, {
                filterWords: state.filterWords.filter(word => {
                    action.payload !== word
                })
            })

        default:
            return state
    }
}
