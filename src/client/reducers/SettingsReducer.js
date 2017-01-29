import initialState from '../constants/initialState';
import {
    SETTING_CHANGED
} from '../constants';

export default function (state = initialState.settings, action) {
    switch (action.type) {
        case SETTING_CHANGED:
            const {name, value} = action.payload

            // assign new value to setting while keeping other 
            // properties intact
            const newSetting = Object.assign({}, state[name], {value})
            
            return Object.assign({}, state, {
                [name]: newSetting
            })

        default:
            return state
    }
}
