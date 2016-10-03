import { BOARD_CHANGE, PROVIDER_CHANGE } from '../constants'

const initialState = {
    provider: "4chan",
    boardID: "g"
};

export default function (state=initialState, action) {
    switch (action.type) {
        case BOARD_CHANGE:
            return Object.assign({}, state, {
                boardID: action.payload
            })

        case PROVIDER_CHANGE:
            return Object.assign({}, state, {
                provider: action.payload
            })

        default:
            return state
    }
}
