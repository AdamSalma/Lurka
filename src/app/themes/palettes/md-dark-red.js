const darkRed = {
    primaryLightest: '#E57373',
    primaryLight:    '#EF5350',
    primary:         '#F44336',
    primaryDark:     '#E53935',
    primaryDarkest:  '#D32F2F',

    greyLightest: "#9E9E9E",
    greyLight:    "#757575",
    grey:         "#616161",
    greyDark:     "#424242",
    greyDarkest:  "#212121",

    textPrimary:   'rgba(255,255,255, 1)',
    textSecondary: 'rgba(255,255,255, 0.7)',
    textDisabled:  'rgba(255,255,255, 0.5)',
    divider:       'rgba(255,255,255, 0.12)',

    board: '#2e2927',  // hsl(0, 0%, 16%) warm-tint
    // boardSearchbar: 'rgba(228, 74, 73, 0.11)',
    boardSearchbar: 'rgba(255, 255, 255, 0.02)',
    boardPostBackground: '#26211f',  // hsl(0, 0%, 13%) warm-tint
    boardPostShadow: '#312d2b',  // HOOK

    threadPostBackground: '#2e2927', // hsl(0, 0%, 16%) warm-tint

    postHighlight: '#D32F2F',  // mix($primary, $grey, 10%)

    textSelectionBackground: '#D50000',  // $primary
    textSelectionColor: '#FFEBEE',  // lighten($primary, 60%)

    contentBorder: '#2e2927', // hsl(0, 0%, 16%) warm-tint
}


// warm-tint: adjust-color($color, $red: +5, $blue: -2);
// cold-tint: adjust-color($color, $red: -2, $blue: +5);

export default darkRed;
