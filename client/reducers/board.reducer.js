import { BOARD_LOADED, BOARD_LIST_LOADED } from '../constants'

const initialState = {
    isFetching: false,
    didInvalidate: false,
    boardList: [],
    items: []
};

export default function (state=initialState, action) {
    console.log("Board Reducer:", state, action);
    switch (action.type) {
        case BOARD_LOADED:
            return Object.assign({}, state, {
                items: action.payload
            })

        case BOARD_LIST_LOADED:
            return Object.assign({}, state, {
                boardList: action.payload
            })

        default:
            return state
    }
}
