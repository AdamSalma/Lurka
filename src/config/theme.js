module.exports = module.exports.default = {
    primaryLightest: '#eca8a7',
    primaryLight: '#e77a79',
    primary: '#e44a49',
    primaryDark: '#e01b1a',
    primaryDarkest: '#b71110',

    greyLightest: "#45403e",
    greyLight:    "#35302e",
    grey:         "#2e2927",
    greyDark:     "#26211f",
    greyDarkest:  "#1f1a18",

    textPrimary: 'rgba(255,255,255, 1)',
    textSecondary: 'rgba(255,255,255, 0.7)',
    textDisabled: 'rgba(255,255,255, 0.5)',
    divider: 'rgba(255,255,255, 0.12)',

    board: '#2e2927',  // hsl(0, 0%, 16%) warm-tint
    boardSearchbar: '#3e3636',
    boardPostBackground: '#26211f',  // hsl(0, 0%, 13%) warm-tint
    boardPostShadow: '#312d2b',  // HOOK

    threadPostBackground: '#2e2927', // hsl(0, 0%, 16%) warm-tint

    postHighlight: '#402c2a',  // mix($primary, grey(7), 10%)

    textSelectionBackground: '#e44a49',  // $primary
    textSelectionColor: '#f4b6b6',  // lighten($primary, 60%)

    contentBorder: '#2e2927', // hsl(0, 0%, 16%) warm-tint
}


// warm-tint: adjust-color($color, $red: +5, $blue: -2);
// cold-tint: adjust-color($color, $red: -2, $blue: +5);
