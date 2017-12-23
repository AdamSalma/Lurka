import * as types from '../types'
import initialState from '../initialState';
import { createReducer, mergeState } from '~/utils/redux';

export default createReducer(initialState.api, {
    [types.BOARD_LOADED]: (state, action) =>
        mergeState(state, {
            board: {
                [action.receivedAt]: action.posts
            }
        }),
});
