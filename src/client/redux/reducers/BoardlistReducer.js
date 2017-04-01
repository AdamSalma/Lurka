import initialState from '../initialState';
import { 
    BOARD_LIST_LOADED, 
    BOARD_LIST_REQUESTED,
    BOARD_LIST_INVALIDATED,
    BOARD_LIST_ADD_FAVOURITE,
    BOARD_LIST_REMOVE_FAVOURITE,
    BOARD_LIST_SEARCH_LOADED
} from '../types'

export default function (state=initialState.boardList, action) {
    switch (action.type) {

        case BOARD_LIST_REQUESTED:
            return Object.assign({}, state, {
                didInvalidate: false
            })
        
        case BOARD_LIST_INVALIDATED:
            return Object.assign({}, state, {
                didInvalidate: true
            })

        case BOARD_LIST_LOADED:
            return Object.assign({}, state, {
                [action.provider]: action.payload
            })

        case BOARD_LIST_SEARCH_LOADED:
            // append new search results to the providers boardlist
            return Object.assign({}, state, {
                [action.provider]: [...state[action.provider]].push(action.payload)
            })

        case BOARD_LIST_ADD_FAVOURITE:
            return Object.assign({}, state, {
                favourites: [...state.favourites,
                    action.payload
                ]
            })

        case BOARD_LIST_REMOVE_FAVOURITE:
            return Object.assign({}, state, {
                favourites: state.favourites.filter(
                    board =>
                        board.boardID !== action.payload.boardID &&
                        board.provider === action.payload.provider
                )
            })

        default:
            return state
    }
}
