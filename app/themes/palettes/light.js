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
theme.greyBorder              = "#2F3136";

// *** Text ***
theme.textPrimary             = c('#111').alpha(1),
theme.textSecondary           = c('#111').alpha(0.7),
theme.textDisabled            = c('#111').alpha(0.5),
theme.textSelectionBackground = theme.primary;
theme.textSelectionColor      = c(theme.primary).lighten(0.6);

// *** Other ***
theme.interfaceColor          = '#faf9fa'; // hsl(0, 0%, 16%) warm-tint
theme.interfaceHighlight      = '#fff'; // hsl(0, 0%, 16%) warm-tint
theme.contentColor            = '#fff';

theme.divider                 = c('#111').alpha(0.12),
theme.greenText               = '#69b96d'
theme.highlight               = '#cdb4b2'  // mix($primary, grey(7), 10%)

// *** Components ***
theme.board                   = theme.greyLightest;  // hsl(0, 0%, 16%) warm-tint
theme.boardSearchbar          = "#f7f7f7" // 'rgba(255, 255, 255, 0.02)',
theme.boardPostShadow         = c('#72685e'),
theme.boardPostBackground     = theme.contentColor;  // hsl(0, 0%, 13%) warm-tint
theme.boardPostBorderColor    = "#e6e5de"
theme.boardPostHover          = theme.interfaceColor;

theme.primaryOverlay          = c(theme.primary).alpha(0.22);

theme.headerSearchbar         = c('#fff'),
theme.headerShrunk            = theme.greyLightest;
theme.headerExpanded          = theme.greyLightest;

theme.threadPostBackground    = theme.contentColor; // hsl(0, 0%, 16%) warm-tint
theme.threadBorderColor       = theme.interfaceColor; // hsl(0, 0%, 16%) warm-tint
theme.contentBorder           = theme.grey;


// Stringify then parse to turn getters into normal props
export default themeFreeze(theme);
