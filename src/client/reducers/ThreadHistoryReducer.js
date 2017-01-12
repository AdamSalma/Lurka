import initialState from '../constants/initialState';
import { 
    THREAD_LOADED_FROM_HISTORY,
    THREAD_SAVED_TO_HISTORY
} from '../constants'

export default function (state = initialState.threadHistory, action) {
    let history
    switch (action.type) {

        case THREAD_SAVED_TO_HISTORY:
            history = Object.assign({}, state[action.provider], {
                [action.threadID]: action.payload
            })

            return Object.assign({}, state, {
                [action.provider]: history
            })

        case THREAD_LOADED_FROM_HISTORY:
            history = Object.assign({}, state[action.provider], {
                [action.threadID]: {}
            })

            return Object.assign({}, state, {
                [action.provider]: history
            })

        default:
            return state
    }
}
