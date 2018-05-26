import freeze from 'deep-freeze-node';

/**
 * Uses a dictionary hash table rather than a switch statement to execute
 * reducers, which slightly increases performance on reducers with
 * multiple handlers
 */
export const createReducer = (initialState, handlers) =>
    (state=initialState, action) =>
        action.type in handlers
            ? handlers[action.type](state, action)
            : state;

/**
 * Extend a state object without mutating it.
 *
 * @params {Object} - Any number of objects that will be merged without
 *                    mutation. Last object takes merge priority
 * @return {Object}
 */
export const mergeState = function() {
    const state = Object.assign.bind(null, {}).apply(null, arguments);
    return freeze(state);
}
