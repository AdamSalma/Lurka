import * as types from '../types'
import initialState from '../initialState';
import { createReducer, mergeState } from '~/utils/redux';

export default createReducer(initialState.status, {
	[types.ALERT_MESSAGE]: (state, action) =>
        mergeState(state, {
            alertMessage: action.payload
        }),

    [types.PROVIDER_CHANGE]: (state, action) =>
        mergeState(state, {
            provider: action.payload
        }),

    [types.BOARD_REQUESTED]: (state, action) =>
        mergeState(state, {
            boardID: action.payload
        }),

    [types.THREAD_REQUESTED]: (state, action) =>
        mergeState(state, {
            threadID: action.payload
        }),

    [types.THREAD_INVALIDATED]: (state, action) =>
    	mergeState(state, {
            threadID: null
        }),

    [types.THREAD_DESTROYED]: (state, action) =>
        mergeState(state, {
            threadID: null
        }),

    [types.BOARD_DESTROYED]: (state, action) =>
        mergeState(state, {
            boardID: null
        })
});
