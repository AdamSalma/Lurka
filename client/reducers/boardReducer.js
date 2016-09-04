import { BOARD_LOADED } from '../constants'

const initialState = {
    isFetching: false,
    didInvalidate: false,
    items: []
};

export default function (state=initialState, action) {
    console.log("Board Reducer:", state, action);
    switch (action.type) {
        case BOARD_LOADED:
            return Object.assign({}, state, {
                items: action.payload
            })

        default:
            return state
    }
}
