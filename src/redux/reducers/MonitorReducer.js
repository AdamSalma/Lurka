import * as types from '../types'
import initialState from '../initialState';
import { createReducer, mergeState } from '~/utils/redux';


// TODO: Complete monitor reducer
export default createReducer(initialState.threadMonitor, {
    [types.THREAD_MONITOR_ADDED]: (state, action) =>
        mergeState(state, {
            newPosts: state.newPosts + action.newPosts || 0,
            threads: [...state.threads, action.payload]
        }),

    [types.THREAD_MONITOR_DELETED]: (state, action) => state,

    [types.THREAD_MONITOR_UPDATED]: (state, action) => state,

});
