import {
    SETTING_CHANGED
} from '../constants'

export function toggleSetting({name, setTo}) {

    console.log("Action toggleSetting()", name);
    return (dispatch, getState) => {
        const settings = getState().settings
        const val = settings[name].value

        if (typeof val === "boolean") {
            // toggle
            console.info(`${name} was toggled to ${!val}`);
            dispatch(settingToggle(name, !val))
        } else {
            // set
            if (setTo === undefined) {
                throw new Error(`Setting change: No setTo value was set. (${name} can't be toggled)`)
            }
            console.info(`${name} was changed from ${val} to ${setTo}`);
            dispatch(settingToggle(name, setTo))
        }
    }
}

function settingToggle(name, value) {
    return {
        type: SETTING_CHANGED, 
        payload: {
            name,
            value
        }
    }
}
