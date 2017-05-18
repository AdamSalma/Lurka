import * as types from '../types'
import initialState from '../initialState';
import { createReducer, mergeState } from '~/utils/redux';

export default createReducer(initialState.cache, {
    [types.BOARD_CACHE_SAVED]: (state, action) =>
        mergeState(state, mergeState(state.board, {
            [action.boardID]: action.payload
        })),

    [types.THREAD_CACHED]: (state, action) =>
        mergeState(state, mergeState(state.thread, {
            [action.threadID]: action.payload
        })),

    [types.BOARD_CACHE_CLEARED]: (state, action) =>
        mergeState(state, {
            board: {}
        }),

    [types.THREAD_CACHE_CLEARED]: (state, action) =>
        mergeState(state, {
            thread: {}
        }),
});
