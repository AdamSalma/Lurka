/**
 * Immutable global app settings used to configure how Lurka behaves.
 *
 * To see the effects you must either rebuild the project or run in dev mode.
 * See package.json -> scripts
 */

if (typeof window === 'undefined') {
    global.window = {}  // For tests
}

window.Lurka = {};
window.Lurka.defaultTheme = require('./theme');

if (process.env.NODE_ENV !== "production") {
    const dev = window.Lurka.development = {}
    dev.performanceTest = (duration=5000) => {
        const Perf = window.Perf = window.Perf || require('react-addons-perf');
        Perf.start()
        setTimeout(() => {
            Perf.stop();
            Perf.printDOM();
            Perf.printWasted();
        }, duration)
    }

    dev.$ = $

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
    headerHeightExpanded: 112,
    headerHeight: 64,
    subheaderHeight: 48,
    threadWidth: 850,
    settingsWidth: 320,

    theme: require('./theme'),

    // Which side of the screen alerts pop up from
    alertPosition: "top left",

    // Duration, type and message for alerts
    alerts: require('./alerts'),

    // Notification messages etc. Reusable.
    errors: require('./errors'),

    iconPackName: 'lurka',
    icons: require('./icons'),

    // Backoff
    apiBackoff: [10, 15, 20, 30, 60, 90, 120, 180, 240, 300]
}


export default window.appSettings;
