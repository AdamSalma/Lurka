import * as types from '../types'
import initialState from '../initialState';
import { createReducer, mergeState } from '~/utils/redux';
import merge from 'updeep';

export default createReducer(initialState.cinema, {
    [types.POST_OPENED]: (state, action) => {
        return merge({
            isOpen: true,
            position: action.payload.position,
            context: action.payload.context
        }, state);
    },

    [types.POST_CLOSED]: (state, action) => {
        return merge({
            isOpen: false,
            position: null,
            context: null
        }, state);
    }
});
