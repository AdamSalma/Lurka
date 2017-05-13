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

    // when you click on a reference in a thread
    threadpostScrollDuration: 600,

    // how long to keep a thread highlighted on scroll
    threadpostScrollHighlightDuration: 2000,

    // The following settings can't be changed explcitly.
    // Needs to be kept in sync with src/styles/base/variables
    headerHeight: 60,
    threadWidth: 981,
    drawerWidth: 250,
    drawerAnimationDuration: 500,

    homeViewID: 'HomeView',
    contentViewID: 'ContentView',
    settingsViewID: 'SettingsView',

    icons: {
        navbarArchive: 'ios-box',
        navbarEye:     'ios-eye',
        navbarChevron: 'ios-arrow-right',
        navbarSearch:  'ios-search-strong',
        navbarCompose: 'plus',
        navbarRefresh: 'refresh',

        threadPostImageFullscreen: 'arrow-expand',

        threadPostMenu: 'more',
        threadPostControlsReport: "flag",
        threadPostControlsDownload: "arrow-down-a",
        threadPostControlsReply: "chatbox-working",
        threadPostControlsImageSearch: "ios-search-strong",
        threadPostControlsHide: "minus-circled"

    }
}
