import * as types from '../types'
import initialState from '../initialState';
import { createReducer, mergeState } from '~/utils/redux';

export default createReducer(initialState.thread, {
	[types.THREAD_REQUESTED]: (state, action) =>
        mergeState(state, {
            isFetching: true,
            isActive: true,
            didInvalidate: false

        });

    [types.THREAD_INVALIDATED]: (state, action) =>
        mergeState(state, {
            didInvalidate: true,
            isFetching: false
        });

    [types.THREAD_LOADED]: (state, action) =>
        mergeState(state, {
            posts: action.posts,
            isFetching: false,
            receivedAt: action.receivedAt
        });

    [types.THREAD_DESTROYED]: (state, action) =>
        mergeState(state, {
            posts: [],
            isActive: false
        });

    [types.THREAD_CACHE_LOADED]: (state, action) =>
        mergeState(state, action.payload, {
            isActive: true
        });
});
