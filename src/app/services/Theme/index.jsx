import React from 'react';
import { onThemeChange } from '~/events';
import {ServiceComponent} from '~/components';
import ThemeHelper from '~/themes/ThemeHelper'

/**
 * Theme change handler
 * All injection/extraction passes through this class.
 */
export class ThemeService extends ServiceComponent {
    @onThemeChange
    onThemeChange(themeObj) {
        ThemeHelper.injectTheme(themeObj);
        const themeVars = ThemeHelper.extractVariables();
        ThemeHelper.saveTheme(themeVars);
    }
}

// Singleton
export default ThemeService;
