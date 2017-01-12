import initialState from '../constants/initialState';
import { 
    BOARD_LOADED_FROM_HISTORY,
    BOARD_SAVED_TO_HISTORY
} from '../constants'

export default function (state = initialState.boardHistory, action) {
    let history
    switch (action.type) {

        case BOARD_SAVED_TO_HISTORY:
            history = Object.assign({}, state[action.provider], {
                [action.boardID]: action.payload
            })

            return Object.assign({}, state, {
                [action.provider]: history
            })

        case BOARD_LOADED_FROM_HISTORY:
            history = Object.assign({}, state[action.provider], {
                [action.boardID]: {}
            })

            return Object.assign({}, state, {
                [action.provider]: history
            })

        default:
            return state
    }
}
