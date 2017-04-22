import initialState from '../initialState';
import {
    SETTING_CHANGED
} from '../types';

export default function (state = initialState.settings, action) {
    switch (action.type) {
        case SETTING_CHANGED:
            return Object.assign({}, state, Object.assign({}, state.external, {
                [action.payload.setting]: action.payload.value
            }))

        default:
            return state
    }
}
