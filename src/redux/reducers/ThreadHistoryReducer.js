import initialState from '../initialState';
import { 
    THREAD_LOADED_FROM_HISTORY,
    THREAD_SAVED_TO_HISTORY,
    THREAD_HISTROY_CLEARED
} from '../types'

export default function (state = initialState.threadHistory, action) {
    let history
    switch (action.type) {

        case THREAD_SAVED_TO_HISTORY:
            return Object.assign({}, state, {
                [action.provider]: action.payload
            })

        case THREAD_HISTROY_CLEARED:
            return {}

        default:
            return state
    }
}
