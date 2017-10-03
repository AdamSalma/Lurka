import React, { Component } from 'react';
import utils from '~/utils'
import Registry from './registry'

/**
 * CSS4 variable injector
 * All injection/extraction passes through this class.
 */
export class ThemeHelper {
    constructor(theme) {
        this.theme = theme;
        this.injectTheme(theme);
    }

    static saveTheme(theme) {
        utils.localStorage.save('theme', theme);
    }

    static loadTheme(theme) {
        utils.localStorage.save('theme', theme);
    }

    static injectTheme(theme) {
        Object.keys(theme).forEach(key => {
            this.injectCssVariable(key, theme[key]);
        });
    }

    static injectCssVariable(key, value) {
        document.body.style.setProperty(`--${key}`, value);
    }

    static extractVariable(key) {
        return document.body.style.getPropertyValue(key);
    }

    static extractVariables() {
        const theme = {};

        // Keys will always be fixed
        Object.keys(Registry.defaultTheme).forEach( key => {
            const variable = this.extractVariable(`--${key}`);
            theme[key] = variable;
        });

        return theme;
    }
}

// Singleton
export default ThemeHelper;
