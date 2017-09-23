import React, { PureComponent } from 'react';
import cx from 'classnames';
import { onThemeChange } from '~/events';
import utils from '~/utils'

const { defaultTheme } = window.Lurka;

export class ThemeService  {
    constructor() {
        const theme = this.loadTheme();
        this.injectTheme(theme);
    }

    @onThemeChange
    onThemeChange(theme) {
        this.injectTheme(theme);
        const themeVars = this.extractVariables();
        this.saveTheme(themeVars);
    }

    loadTheme() {
        const theme = utils.localStorage.load('theme');

        // Use cached theme, unless first time or corrupt data.
        return theme || defaultTheme;
    }

    saveTheme(theme) {
        utils.localStorage.save('theme', theme);
    }

    injectTheme(theme) {
        Object.keys(theme).forEach(key => {
            this.injectCssVariable(key, theme[key])
            // TODO: Inject variable shades
        });
    }

    injectCssVariable(key, value) {
        document.body.style.setProperty(`--${key}`, value);
    }

    extractVariable(key) {
        return document.body.style.getPropertyValue(key);
    }

    extractVariables() {
        const theme = {};

        // Keys will always be fixed
        Object.keys(defaultTheme).forEach( key => {
            const variable = this.extractVariable(key)
            // change `--variable` into `variable`
            theme[key] = variable.substr(2);
        });

        return theme;
    }
}

export default new ThemeService();
