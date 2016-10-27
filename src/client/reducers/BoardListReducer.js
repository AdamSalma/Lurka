import initialState from './initialState';
import {
    BOARD_LIST_LOADED, 
    BOARD_LIST_REQUEST
} from '../constants'

export default function (state = initialState.boardlist, action) {
    switch (action.type) {
        case BOARD_REQUEST:
            return Object.assign({}, state, {
                isFetching: true  
            })

        case BOARD_LIST_LOADED:
            return Object.assign({}, state, {
                boardList: action.payload
            })

        default:
            return state
    }
}
