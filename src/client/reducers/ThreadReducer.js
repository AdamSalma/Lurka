import initialState from './initialState';
import { 
    THREAD_LOADED, 
    THREAD_REQUESTED, 
    THREAD_DESTROYED
} from '../constants'

export default function (state = initialState.thread, action) {
    switch (action.type) {

        case THREAD_REQUESTED:
            return Object.assign({}, state, {
                isFetching: true,
                isActive: true
            })

        case THREAD_LOADED:
            return Object.assign({}, state, {
                posts: action.payload,
                isFetching: false
            })

        case THREAD_DESTROYED:
            console.log(state)
            console.log(state.history)
            state.history[action.payload] = state.posts;
            console.log(state.history)
            return Object.assign({}, state, {
                history: state.history,
                posts: [],
                isActive: false
            })

        default:
            return state
    }
}
