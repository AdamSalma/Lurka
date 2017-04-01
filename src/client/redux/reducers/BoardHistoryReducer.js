import initialState from '../initialState';
import { 
    BOARD_LOADED_FROM_HISTORY,
    BOARD_SAVED_TO_HISTORY,
    BOARD_HISTROY_CLEARED
} from '../types'

export default function (state = initialState.boardHistory, action) {
    let history
    switch (action.type) {

        case BOARD_SAVED_TO_HISTORY:
            history = Object.assign({}, state, {
                [action.boardID]: action.payload
            })

            return Object.assign({}, state, {
                [action.provider]: history
            })

        case BOARD_HISTROY_CLEARED:
            return {}

        default:
            return state
    }
}
