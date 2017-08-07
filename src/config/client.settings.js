/**
 * Immutable global app settings used to configure how Lurka behaves.
 *
 * To see the effects you must either rebuild the project or run in dev mode.
 * See package.json -> scripts
 */

if (typeof window === 'undefined') {
    global.window = {}  // For tests
}

window.appSettings = {
    // The spacing between board posts
    boardOuterMargin: 30,
    boardPostMargin: 25,

    // when you click on a threadpost quotelink
    threadpostScrollDuration: 600,

    // how long to keep a post highlighted on scroll
    threadpostScrollHighlightDuration: 2000,

    // The following settings can't be changed explcitly.
    // Needs to be kept in sync with src/app/sass/partials/_config.sass
    headerHeight: 64,
    subheaderHeight: 50,
    threadWidth: 1024,
    settingsWidth: 320,

    iconPackName: 'lurka',
    icons: require('./icons')
}
