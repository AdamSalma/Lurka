/**
 * Converts a theme object that has ES6 getters and `Color` instances into an
 * object with string properties (normalised).
 *
 * @param  {Object} theme Theme with getters and `Color` instances
 * @return {Object}       Theme with no getters or `Color` instances
 */
export default function themeFreeze (theme) {
    const _theme = {}
    var color;

    // Convert dependants (getters + `Color`)
    for (color in theme) {
        if (isGetter(theme, color)) {
            _theme[color] = stringifyColor(theme[color]);
        }
    }

    // Convert dependencies (non getters + `Color`)
    for (color in theme) {
        _theme[color] = stringifyColor(theme[color]);
    }

    return _theme
}

export function stringifyColor(color) {
    // Is `Color` instance?
    if (color.rgb) {
        // Get alpha channel, if exists then rgba. Else hex
        return color.rgb().a
            ? color.rgbaString()
            : color.hexString()
    }

    return color;
}


export function isGetter (obj, prop) {
  return !!Object.getOwnPropertyDescriptor(obj, prop)['get']
}
