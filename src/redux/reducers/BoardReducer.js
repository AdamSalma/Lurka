import * as types from '../types'
import initialState from '../initialState';
import { createReducer } from '~/utils/redux';

export default createReducer(initialState.board, {
    [types.BOARD_REQUESTED]: (state, action) => 
        Object.assign({}, state, {
            isFetching: true,
            didInvalidate: false
        });

    [types.BOARD_LOADED]: (state, action) =>
        Object.assign({}, state, {
            posts: action.posts,
            receivedAt: action.receivedAt,
            isFetching: false
        });

    [types.BOARD_INVALIDATED]: (state, action) =>
        Object.assign({}, state, {
            didInvalidate: true
        });

    [types.BOARD_DESTROYED]: (state, action) =>
        Object.assign({}, state, {
            posts: []
        });

    [types.BOARD_FILTER_ADDED]: (state, action) =>
        Object.assign({}, state, {
            filterWords: [
                ...state.filterWords, 
                action.payload
            ]
        });

    [types.REMOVE_FILTER]: (state, action) =>
        Object.assign({}, state, {
            filterWords: state.filterWords.filter(word => {
                action.payload !== word
            });
        });

    [types.BOARD_CACHE_LOADED]: (state, action) =>
        Object.assign({}, state, action.payload);

    [types.BOARD_SEARCHED]: () =>
        Object.assign({}, state, {
            searchWord: action.payload || null
        });

    [types.BOARD_SCROLLED_TO_BOTTOM]: (state, action) =>
        Object.assign({}, state, {
            limit: action.payload
        })]
});
