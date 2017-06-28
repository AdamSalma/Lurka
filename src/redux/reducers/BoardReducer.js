import * as types from '../types'
import initialState from '../initialState';
import { createReducer, mergeState } from '~/utils/redux';

export default createReducer(initialState.board, {
    [types.BOARD_REQUESTED]: (state, action) =>
        mergeState(state, {
            isFetching: true,
            didInvalidate: false
        }),

    [types.BOARD_LOADED]: (state, action) =>
        mergeState(state, {
            posts: action.posts,
            receivedAt: action.receivedAt,
            isFetching: false
        }),

    [types.BOARD_INVALIDATED]: (state, action) =>
        mergeState(state, {
            didInvalidate: true
        }),

    [types.BOARD_DESTROYED]: (state, action) =>
        mergeState(state, {
            posts: []
        }),

    [types.BOARD_FILTER_ADDED]: (state, action) =>
        mergeState(state, {
            filterWords: [
                ...state.filterWords,
                action.payload
            ]
        }),

    [types.REMOVE_FILTER]: (state, action) =>
        mergeState(state, {
            filterWords: state.filterWords.filter(word => {
                action.payload !== word
            })
        }),

    [types.BOARD_CACHE_LOADED]: (state, action) =>
        mergeState(state, action.payload),

    [types.BOARD_SEARCHED]: (state, action) =>
        mergeState(state, {
            search: action.payload || null
        }),

    [types.BOARD_SCROLLED_TO_BOTTOM]: (state, action) =>
        mergeState(state, {
            limit: action.payload
        }),
})
