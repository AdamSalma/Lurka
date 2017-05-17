import * as types from '../types'
import initialState from '../initialState';
import { createReducer } from '~/utils/redux';

export default createReducer(initialState.thread, {
	[types.THREAD_REQUESTED]: (state, action) =>
        Object.assign({}, state, {
            isFetching: true,
            isActive: true,
            didInvalidate: false

        });

    [types.THREAD_INVALIDATED]: (state, action) =>
        Object.assign({}, state, {
            didInvalidate: true,
            isFetching: false
        });

    [types.THREAD_LOADED]: (state, action) =>
        Object.assign({}, state, {
            posts: action.posts,
            isFetching: false,
            receivedAt: action.receivedAt
        });

    [types.THREAD_DESTROYED]: (state, action) =>
        Object.assign({}, state, {
            posts: [],
            isActive: false
        });

    [types.THREAD_CACHE_LOADED]: (state, action) =>
        Object.assign({}, state, action.payload, {
            isActive: true
        });
});
