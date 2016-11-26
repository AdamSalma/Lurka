import initialState from './initialState';
import { 
    BOARD_LIST_LOADED, 
    BOARD_LIST_REQUESTED,
} from '../constants'

// ADD_FAVOURITE_BOARD
// TODO: Add boardList invalidation + favourites

export default function (state=initialState.boardList, action) {
    switch (action.type) {

        
        case BOARD_LIST_LOADED:
            return Object.assign({}, state, {
                [action.provider]: action.payload
            })

        default:
            return state
    }
}
