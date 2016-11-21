import initialState from './initialState';
import { 
    BOARD_LIST_LOADED, 
    BOARD_LIST_REQUESTED,
} from '../constants'

export default function (state=initialState.boardlist, action) {
    switch (action.type) {

        case BOARD_LIST_REQUESTED:
            return Object.assign({}, state, {
                isFetching: true,
                requestType: action.type  // for logging error to user...?
            })

        case BOARD_LIST_LOADED:
            return state[action.key] = action.payload


        default:
            return state
    }
}
