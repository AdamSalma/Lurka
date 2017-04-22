/**
 * Global settings that do not change in a production environment
 */

if (typeof window === 'undefined') {
    // For tests
    global.window = {}
}

window.appSettings = {
    headerHeight: 60,
    drawerWidth: 250,
    drawerAnimationDuration:500,

    icons: {
        navbarArchive: 'ios-box',
        navbarEye:     'ios-eye',
        navbarChevron: 'ios-arrow-right',
        navbarSearch:  'ios-search-strong',
        navbarCompose: 'compose',
        navbarRefresh: 'ios-reload',

        threadPostMenu: 'more',
    }
}
