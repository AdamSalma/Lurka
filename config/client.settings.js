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
        navbarMenu: "navicon",
        navbarForwards: "arrow-right-c",
        navbarBackwards: "arrow-left-c",
        navbarCompose: 'plus',
        navbarRefresh: 'refresh',


        navbarAccount: 'person-add',
        navbarArchive: 'ios-box',
        navbarEye:     'ios-eye',
        navbarSettings: 'gear-b',

        searchMagnify: "ios-search-strong",
        searchClose: "close",

        videoFullscreen: "fullscreen",
        videoPlay: "play",
        videoPause: "pause",
        videoError: "alert-octagon",
        videoVolumeOff: "volume-off",
        videoVolumeMute: "volume-mute",
        videoVolumeLow: "volume-low",
        videoVolumeMedium: "volume-medium",
        videoVolumeHigh: "volume-high",

        boardPostReplyCount: "chatbox",
        boardPostImageCount: "image",

        threadPostImageFullscreen: 'arrow-expand',

        threadPostMenu: 'more',
        threadPostControlsReport: "flag",
        threadPostControlsDownload: "arrow-down-a",
        threadPostControlsReply: "chatbox-working",
        threadPostControlsImageSearch: "ios-search-strong",
        threadPostControlsHide: "minus-circled",

        watchPanelClose: "close",
        watcchPanelUpdate: "update",

        "footerSort": "stats-bars",
        "footerFilter": "funnel",
        "footerLayout": "ios-browsers",
        "footerInfo": "information-circled",
        "footerOpen": "chevron-up",
        "footerClose": "chevron-down",
    }
}
