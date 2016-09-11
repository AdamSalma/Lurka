import { 
    THREAD_LOADED, 
    THREAD_REQUEST, 
    THREAD_DESTROY
} from '../constants'

const initialState = {
    posts: [],
    postsLoaded: 0,
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
                isFetching: false,
                postsLoaded: 0
            })

        case THREAD_DESTROY:
            return Object.assign({}, state, {
                posts: [],
                isFetching: false
            })

        default:
            return state
    }
}
