export const getSettings = state => state.settings;

export const canSetSetting = (state, setting, value) => {
    const currentValue = getSettings()[setting];

    return value && currentValue !== value;
}
