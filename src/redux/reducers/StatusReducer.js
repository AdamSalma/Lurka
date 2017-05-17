import * as types from '../types'
import initialState from '../initialState';
import { createReducer } from '~/utils/redux';

export default createReducer(initialState.status, {
	[types.ALERT_MESSAGE]: (state, action) =>
        Object.assign({}, state, {
            alertMessage: action.payload
        });

    [types.PROVIDER_CHANGE]: (state, action) =>
        Object.assign({}, state, {
            provider: action.payload
        });

    [types.BOARD_REQUESTED]: (state, action) =>
        Object.assign({}, state, {
            boardID: action.payload
        });

    [types.THREAD_REQUESTED]: (state, action) =>
        Object.assign({}, state, {
            threadID: action.payload
        });

    [types.THREAD_INVALIDATED]: (state, action) =>
    	Object.assign({}, state, {
            threadID: null
        });

    [types.THREAD_DESTROYED]: (state, action) =>
        Object.assign({}, state, {
            threadID: null
        });

    [types.BOARD_DESTROYED]: (state, action) =>
        Object.assign({}, state, {
            boardID: null
        })
});