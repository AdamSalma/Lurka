import * as types from '../types'
import initialState from '../initialState';
import { createReducer, mergeState } from '~/utils/redux';
import merge from 'updeep';


// TODO: Complete monitor reducer
export default createReducer(initialState.cinema, {
    [types.CINEMA_OPENED]: (state, action) => {
        return merge({ isActive: true }, state);
    },

    [types.CINEMA_CLOSED]: (state, action) => {
        return merge({ isActive: false }, state);
    },

    [types.CINEMA_TIMELINE_UPDATED]: (state, action) => {
        return merge({ entities: action.payload }, state);
    },

    [types.CINEMA_TIMELINE_CYCLED]: (state, action) => {
        return merge({ entities: action.payload }, state);
    },

    [types.THREAD_DESTROYED]: (state, action) => {
        return merge({ entities: initialState.cinema.entities }, state);
    }

    // [types.WATCH_ENTITY_ADDED]: (state, action) => {
    //     return merge({
    //         entities: {
    //             queue: [
    //                 ...state.entities.queue,
    //                 {
    //                     id: action.payload.id,
    //                     url: action.payload.url,
    //                     lastModified: action.payload.lastModified
    //                 }
    //             ],
    //             results: {
    //                 [action.payload.id]: null
    //             },
    //             metadata: {
    //                 [action.payload.id]: {
    //                     isFetching: false,
    //                     didInvalidate: false,
    //                     postsCount: action.payload.postsCount,
    //                     lastReplyAt: action.payload.lastReplyAt,
    //                     op: action.payload.op
    //                 }
    //             }
    //         }
    //     }, state);
    // },

});
