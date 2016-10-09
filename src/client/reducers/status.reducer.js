import { BOARD_CHANGE, PROVIDER_CHANGE } from '../constants';
import initialState from './initialState';


export default function (state = initialState.status, action) {
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
