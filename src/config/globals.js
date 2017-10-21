/**
 * Immutable global app settings used to configure how Lurka behaves.
 */

if (typeof window === 'undefined') {
    global.window = {}  // For tests
}

window.Lurka = {};
Lurka.defaultTheme = "dark-red"

if (process.env.NODE_ENV !== "production") {
    // IIFE allows the `require()` to only happen once.
    // Lurka.performanceTest = ((testDuration=5000) => {
    //     const Perf =  require('react-addons-perf');
    //     return () => {
    //         Perf.start()
    //         setTimeout(() => {
    //             Perf.stop();
    //             Perf.printDOM();
    //             Perf.printWasted();
    //         }, testDuration);
    //     }
    // })();

    // JQuery is only global inside webpack
    Lurka.$ = $
    Lurka.Axios = require('axios').default
}

Lurka.iconPackName = 'icon';
Lurka.icons = require('./icons');

// Duration, type and message for alerts
Lurka.alerts = require('./alerts');

// Notification messages etc. Reusable.
Lurka.errors = require('./errors');

Lurka.settings = {
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
    boardPostWidth: 232,

    // Seconds to backoff when making a request
    apiBackoff: [10, 15, 20, 30, 60, 90, 120, 180, 240, 300],

    // Captcha
    siteKey: "6Ldp2bsSAAAAAAJ5uyx_lx34lJeEpTLVkP5k04qc",

    // Which side of the screen alerts pop up from
    alertPosition: "bottom left"
}

// Makes object immutable.
require('deep-freeze-node')(Lurka);
