import { createSelector } from 'reselect';

export const getSettings = state => state.settings;

export const canSetSetting = (state, setting, value) => {
    const currentValue = getSettings()[setting];

    return value && currentValue !== value;
}

export const getHomeBoard = state => state.settings.homeBoard;
export const getUserSettings = createSelector(getSettings, settings => {
    const userSettings = Object.assign({}, settings);
    delete userSettings['internal'];
    delete userSettings['settingDetails'];
});

export const getUserSettingsDetails = state => state.settings.details;
export const getInternalSetting = (state, key) => state.settings.internal[key];
