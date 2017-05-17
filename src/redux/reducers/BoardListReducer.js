import * as types from '../types'
import initialState from '../initialState';
import { createReducer } from '~/utils/redux';

export default createReducer(initialState.boardList, {
    [BOARD_LIST_REQUESTED]: (state, action) =>
        Object.assign({}, state, {
            didInvalidate: false
        })

    [BOARD_LIST_INVALIDATED]: (state, action) =>
        Object.assign({}, state, {
            didInvalidate: true
        })

    [BOARD_LIST_LOADED]: (state, action) =>
        Object.assign({}, state, action.payload)

    [BOARD_LIST_ADD_FAVOURITE]: (state, action) =>
        Object.assign({}, state, {
            favourites: [...state.favourites,
                action.payload
            ]
        })

    [BOARD_LIST_REMOVE_FAVOURITE]: (state, action) =>
        Object.assign({}, state, {
            favourites: state.favourites.filter(
                board => board.boardID !== action.payload.boardID
            )
        })
});