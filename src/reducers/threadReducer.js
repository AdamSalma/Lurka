import { THREAD_LOADED } from '../constants'

const initialState = {
    isFetching: false,
    didInvalidate: false,
    posts: []
};

export default function (state=initialState, action) {
    console.log("Thread Reducer:", state, action);
    switch (action.type) {
        case THREAD_LOADED:
            return Object.assign({}, state, {
                posts: action.payload
            })

        default:
            return state
    }
}
