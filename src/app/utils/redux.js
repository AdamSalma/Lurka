/**
 * Uses a dictionary hash table rather than a switch statement to execute
 * reducers, which slightly increases performance on reducers with
 * multiple handlers
 */
export const createReducer = (initialState, handlers) =>
    function (state=initialState, action) {
        return action.type in handlers
            ? handlers[action.type](state, action)
            : state;
    }

/**
 * Extend a state object without mutating it.
 *
 * @param  {Object} oldState - The old store state
 * @param  {Object} newState - The new store state
 * @return {Object}
 */
export const mergeState = function() {
    return Object.assign.bind(null, {}).apply(null, arguments)
}


export const normaliseApiError = (err) => {
    return err && err.response ? err.response : {}
}