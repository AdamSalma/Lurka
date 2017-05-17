import * as types from '../types'
import initialState from '../initialState';
import { createReducer } from '~/utils/redux';

export default createReducer(initialState.cache, {
    [types.BOARD_CACHE_SAVED]: (state, action) =>
        Object.assign({}, state, Object.assign({}, state.board, {
            [action.boardID]: action.payload
        }))

    [types.THREAD_CACHED]: (state, action) =>
        Object.assign({}, state, Object.assign({}, state.thread, {
            [action.threadID]: action.payload
        }))

    [types.BOARD_CACHE_CLEARED]: (state, action) =>
        Object.assign({}, state, {
            board: {}
        })

    [types.THREAD_CACHE_CLEARED]: (state, action) =>
        Object.assign({}, state, {
            thread: {}
        })
});
