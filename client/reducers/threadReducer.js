import { THREAD_LOADED, THREAD_REQUEST } from '../constants'

const initialState = {
    posts: [],
    isFetching: false
};

export default function (state=initialState, action) {
    console.log("Thread Reducer:", state, action);
    switch (action.type) {

        case THREAD_REQUEST:
            return Object.assign({}, state, {
                isFetching: true
            })

        case THREAD_LOADED:
            return Object.assign({}, state, {
                posts: action.payload,
                isFetching: false
            })

        default:
            return state
    }
}
