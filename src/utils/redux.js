/**
 * Uses a dictionary hash table rather than a switch statement to execute 
 * reducers, which slightly increases performance on reducers with 
 * multiple handlers 
 */
export const createReducer = (initialState, handlers) => 
    return (state=initialState, action) =>
        handlers.hasOwnProperty(action.type) 
            ? handlers[action.type](state, action) 
            : state;

/**
 * Creates a new state object without mutating it.
 * @param  {...Object} - any number of objects to merge into the new state
 * @return {Object}
 */
export const newState = function() {
    return Object.assign.apply(null, [{}, arguments])
}