import * as types from '../types'
import initialState from '../initialState';
import { createReducer, mergeState } from '~/utils/redux';
import merge from 'updeep';


// TODO: Complete monitor reducer
export default createReducer(initialState.watcher, {
    [types.THREAD_MONITOR_ADDED]: (state, action) =>
        merge({
            newPosts: state.newPosts + action.newPosts || 0,
            threads: [...state.threads, action.payload]
        }, state),

    [types.THREAD_MONITOR_DELETED]: (state, action) => state,

    [types.THREAD_MONITOR_UPDATED]: (state, action) => state,

    [types.WATCH_ENTITY_ADDED]: (state, action) => {
        return merge({
            entities: {
                queue: [
                    ...state.entities.queue,
                    {
                        id: action.payload.id,
                        url: action.payload.url,
                        lastModified: action.payload.lastModified
                    }
                ],
                results: {
                    [action.payload.id]: null
                },
                metadata: {
                    [action.payload.id]: {
                        isFetching: false,
                        didInvalidate: false,
                        postsCount: action.payload.postsCount,
                        lastReplyAt: action.payload.lastReplyAt,
                        op: action.payload.op
                    }
                }
            }
        }, state);
    },

    [types.WATCH_ENTITY_REMOVED]: (state, action) => {
        return merge({
            entities: {
                queue: state.entities.queue.filter( entity => entity.id !== action.payload.id),
                results: merge.omit(action.payload.id),
                metadata: merge.omit(action.payload.id)
            }
        }, state)
    },

    [types.WATCH_ENTITY_UPDATED]: (state, action) => {
        // Update lastModified, add http response data
        const queue = state.entities.queue.map( entity => {
            if (entity.id === action.payload.id) {
                return merge({
                    lastModified: action.payload.lastModified
                }, entity)
            }

            return entity
        });

        return merge({
            entities: {
                queue: queue,
                results: {
                    [action.payload.id]: action.payload.content
                }
            }
        }, state);
    },

    [types.WATCH_ENTITY_INVALIDATED]: (state, action) => {
      return merge({
        entities: {
            metadata: {
                [action.payload.id]: {
                    isFetching: false,
                    didInvalidate: true
                }
            }
        }
      });
    },

    [types.WATCH_ENTITY_UNMODIFIED]: (state, action) => {
        return merge({
        entities: {
            metadata: {
                [action.payload.id]: {
                    isFetching: false
                }
            }
        }
      });
    }


});
