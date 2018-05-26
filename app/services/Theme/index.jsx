import React from 'react';
import { onThemeChange } from '~/events';
import ServiceComponent from '../ServiceComponent'
import CSSInjector from '~/themes/CSSInjector'

/**
 * Theme change handler
 * All injection/extraction passes through this class.
 */
export class ThemeService extends ServiceComponent {
    @onThemeChange
    onThemeChange(themeObj) {
        CSSInjector.injectTheme(themeObj);
        const themeVars = CSSInjector.extractVariables();
        CSSInjector.saveTheme(themeVars);
    }
}

// Singleton
export default ThemeService;
