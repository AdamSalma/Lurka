import {
    SETTING_CHANGED
} from '../types'

export function setSetting(setting, value) {
    console.log("Action toggleSetting()", setting, value);

    return (dispatch, getState) => {

        if (shouldChangeSetting(getState(), setting, value)) {
            console.warn(`Action setSetting() rejected. value arg: ${value}, state value: ${val}`)
            return
        }

        console.info(`${setting} was changed from ${val} to ${value}`);
        dispatch(settingSet(setting, value))
    }
}

function settingSet(setting, value) {
    return {
        type: SETTING_CHANGED,
        payload: {
            setting, value
        }
    }
}

function shouldChangeSetting({settings}, setting, value) {
    const val = settings.external[setting]

    return !val || val === value
}
