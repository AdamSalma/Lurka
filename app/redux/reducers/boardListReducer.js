import * as types from '../types'
import initialState from '../initialState';
import { createReducer, mergeState } from '~/utils/redux';
import merge from 'updeep';

export default createReducer(initialState.boardList, {
    [types.BOARD_LIST_REQUESTED]: (state, action) =>
        mergeState(state, {
            didInvalidate: false
        }),

    [types.BOARD_LIST_INVALIDATED]: (state, action) =>
        mergeState(state, {
            didInvalidate: true
        }),

    [types.BOARD_LIST_LOADED]: (state, action) => {
        return merge(action.payload, state)
    },

    [types.BOARD_LIST_ADD_FAVOURITE]: (state, action) =>
        mergeState(state, {
            favourites: [...state.favourites,
                action.payload
            ]
        }),

    [types.BOARD_LIST_REMOVE_FAVOURITE]: (state, action) =>
        mergeState(state, {
            favourites: state.favourites.filter(
                board => board.boardID !== action.payload.boardID
            )
        })
});
