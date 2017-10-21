import Color from 'color';

export const warmTint = (color, scale=2) => {
    var color = Color(color);

    color.red(color.red() + 2 * scale);
    color.green(color.green() + 1 * scale);
    color.blue(color.blue() + -1 * scale);

    return toString(color)
}

export const coldTint = (color, scale=2) => {
    var color = Color(color);

    color.red(color.red() + -1 * scale);
    color.green(color.green() + 1 * scale);
    color.blue(color.blue() + 2 * scale);

    return toString(color)
}

function toString(color) {
    if (color.rgb().a) {
        return color.rgbaString()
    }
    return color.hexString()
}
