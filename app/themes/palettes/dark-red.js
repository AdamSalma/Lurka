/**
 * Dark Red theme
 * By Lurka
 */

import c from 'color'
import themeFreeze from '../themeFreeze';
import { warmTint, coldTint } from '../utils';

export const theme = {}

// *** Primary ***
theme.primary                 = '#e44a49',
theme.primaryDark             = c(theme.primary).alpha(0.5);
theme.primaryDarkest          = c(theme.primary).alpha(0.22);
theme.primaryLight            = c(theme.primary).lighten(0.1).saturate(0.1);
theme.primaryLightest         = c(theme.primary).lighten(0.3).saturate(0.3);

// *** Greys ***
theme.greyLightest            = "hsl(0, 0%, 19%)";
theme.greyLight               = "hsl(0, 0%, 15%)";
theme.grey                    = "hsl(0, 0%, 13%)";
theme.greyDark                = "hsl(0, 0%, 11%)";
theme.greyDarkest             = "hsl(0, 0%, 7%)";

// *** Text ***
theme.textPrimary             = c('white').alpha(1),
theme.textSecondary           = c('white').alpha(0.7),
theme.textDisabled            = c('white').alpha(0.5),
theme.textSelectionBackground = theme.primary;
theme.textSelectionColor      = c(theme.primary).lighten(0.6);

// *** Other ***
theme.divider                 = c('white').alpha(0.12),
theme.greenText               = '#a4c73b'
theme.highlight               = '#402c2a'  // mix($primary, grey(7), 10%)
theme.interfaceColor          = '#262626'; // hsl(0, 0%, 16%) warm-tint
theme.contentColor            = '#121212';

// *** Components ***
theme.board                   = theme.grey;  // hsl(0, 0%, 16%) warm-tint
theme.boardSearchbar          = theme.interfaceColor // 'rgba(255, 255, 255, 0.02)',
theme.boardPostShadow         = c('#312d2b'),
theme.boardPostBackground     = theme.greyDarkest;  // hsl(0, 0%, 13%) warm-tint
theme.boardPostHover          = theme.highlight;  // hsl(0, 0%, 13%) warm-tint

theme.primaryOverlay          = c(theme.primary).alpha(0.22);

theme.headerSearchbar         = c('#444444'),
theme.headerShrunk            = theme.greyDark;
theme.headerExpanded          = theme.greyDark;

theme.threadPostBackground    = theme.grey; // hsl(0, 0%, 16%) warm-tint
theme.contentBorder           = theme.grey;


// Stringify then parse to turn getters into normal props
export default themeFreeze(theme);
