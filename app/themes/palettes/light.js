/**
 * Light theme
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
theme.greyLightest            = "hsl(0, 0%, 95%)";
theme.greyLight               = "hsl(0, 0%, 91%)";
theme.grey                    = "hsl(0, 0%, 87%)";
theme.greyDark                = "hsl(0, 0%, 83%)";
theme.greyDarkest             = "hsl(0, 0%, 60%)";

// *** Text ***
theme.textPrimary             = c('#111').alpha(1),
theme.textSecondary           = c('#111').alpha(0.7),
theme.textDisabled            = c('#111').alpha(0.5),
theme.textSelectionBackground = theme.primary;
theme.textSelectionColor      = c(theme.primary).lighten(0.6);

// *** Other ***
theme.divider                 = c('#111').alpha(0.12),
theme.greenText               = '#69b96d'
theme.highlight               = '#cdb4b2'  // mix($primary, grey(7), 10%)
theme.interfaceColor          = '#faf9fa'; // hsl(0, 0%, 16%) warm-tint
theme.contentColor            = '#fff';

// *** Components ***
theme.board                   = theme.grey;  // hsl(0, 0%, 16%) warm-tint
theme.boardSearchbar          = "#e8e8dd" // 'rgba(255, 255, 255, 0.02)',
theme.boardPostShadow         = c('#72685e'),
theme.boardPostBackground     = theme.contentColor;  // hsl(0, 0%, 13%) warm-tint
theme.boardPostHover          = theme.interfaceColor;

theme.primaryOverlay          = c(theme.primary).alpha(0.22);

theme.headerSearchbar         = c('#444444'),
theme.headerShrunk            = theme.greyLightest;
theme.headerExpanded          = theme.greyLightest;

theme.threadPostBackground    = theme.grey; // hsl(0, 0%, 16%) warm-tint
theme.contentBorder           = theme.grey;


// Stringify then parse to turn getters into normal props
export default themeFreeze(theme);
