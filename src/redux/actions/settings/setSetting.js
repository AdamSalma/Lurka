import * as types from '~/redux/types';
import {canSetSetting} from '~/redux/selectors/settings';

export default function setSetting(key, value) {
    console.log("Action setSetting()", key, value);

    return (dispatch, getState) => {
        if (canSetSetting(getState(), key, value)) {
            console.warn(`Could not change setting '${key}' to '${value}'`);
            return
        }

        dispatch(settingChanged(key, value))
        console.info(`The setting ${key} was changed to ${value}`);
    }
}

export function settingChanged(setting, value) {
    return {
        type: types.SETTING_CHANGED,
        payload: { setting, value }
    }
}
