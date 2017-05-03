/**
 * Global settings that do not change in a production environment.
 *
 * To see the effects you must either rebuild the project or run in dev mode.
 * See package.json -> scripts
 */

if (typeof window === 'undefined') {
    global.window = {}  // For tests
}

window.appSettings = {
    boardOuterMargin: 30,
    boardPostMargin: 25,

    // The following settings can't be changed explcitly.
    // Needs to be kept in sync with src/styles/base/variables
    headerHeight: 60,
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
        navbarCompose: 'ios-plus-outline',
        navbarRefresh: 'ios-reload',

        threadPostMenu: 'more',
    }
}
