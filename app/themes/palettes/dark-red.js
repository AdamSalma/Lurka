/**
 * Dark Red theme
 * By Lurka
 */

import c from 'color'
import themeFreeze from '../themeFreeze';
import { warmTint, coldTint } from '../utils';

export const darkRed = {
    // *** Primary ***
    primary:         '#e44a49',
    get primaryDark () { return c(this.primary).alpha(0.5) },
    get primaryDarkest () { return c(this.primary).alpha(0.22) },
    get primaryLight () { return c(this.primary).lighten(0.1).saturate(0.1) },
    get primaryLightest () { return c(this.primary).lighten(0.3).saturate(0.3) },
    // primaryLightest: '#eca8a7',
    // primaryLight:    '#e77a79',
    // primaryDark:     '#e01b1a',
    // primaryDarkest:  '#b71110',

    // *** Greys ***
    greyLightest: "hsl(0, 0%, 19%)",
    greyLight:    "hsl(0, 0%, 15%)",
    grey:         "hsl(0, 0%, 13%)",
    greyDark:     "hsl(0, 0%, 11%)",
    greyDarkest:  "hsl(0, 0%, 7%)",

    // *** Text ***
    textPrimary:   c('white').alpha(1),
    textSecondary: c('white').alpha(0.7),
    textDisabled:  c('white').alpha(0.5),
    divider:       c('white').alpha(0.12),

    // *** Other ***
    greenText: '#a4c73b',

    get textSelectionBackground(){ return this.primary },
    get textSelectionColor() { return c(this.primary).lighten(0.6) },

    highlight: '#402c2a',  // mix($primary, grey(7), 10%)
    get primaryOverlay() { return c(this.primary).alpha(0.22) },
    get interfaceColor () { return this.greyDark }, // hsl(0, 0%, 16%) warm-tint
    get contentColor () { return this.grey },

    // *** Layout ***
    get board () { return this.grey },  // hsl(0, 0%, 16%) warm-tint
    get headerShrunk () { return this.greyDark },
    get headerExpanded () { return this.greyDark },

    // boardSearchbar: 'rgba(228, 74, 73, 0.11)',
    boardSearchbar: 'rgba(255, 255, 255, 0.02)',
    get boardPostBackground () { return this.greyLight },  // hsl(0, 0%, 13%) warm-tint
    boardPostShadow: c('#312d2b'),  // HOOK

    get threadPostBackground () { return this.grey }, // hsl(0, 0%, 16%) warm-tint
    get contentBorder () { return this.grey },


    /* Tint functions from sass color scheme */
    // warm-tint: adjust-color($color, $red: +5, $blue: -2);
    // cold-tint: adjust-color($color, $red: -2, $blue: +5);
}

// Stringify then parse to turn getters into normal props

export default themeFreeze(darkRed);
