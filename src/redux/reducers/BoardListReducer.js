import * as types from '../types'
import initialState from '../initialState';
import { createReducer, mergeState } from '~/utils/redux';

export default createReducer(initialState.boardList, {
    [BOARD_LIST_REQUESTED]: (state, action) =>
        mergeState(state, {
            didInvalidate: false
        })

    [BOARD_LIST_INVALIDATED]: (state, action) =>
        mergeState(state, {
            didInvalidate: true
        })

    [BOARD_LIST_LOADED]: (state, action) =>
        mergeState(state, action.payload)

    [BOARD_LIST_ADD_FAVOURITE]: (state, action) =>
        mergeState(state, {
            favourites: [...state.favourites,
                action.payload
            ]
        })

    [BOARD_LIST_REMOVE_FAVOURITE]: (state, action) =>
        mergeState(state, {
            favourites: state.favourites.filter(
                board => board.boardID !== action.payload.boardID
            )
        })
});
