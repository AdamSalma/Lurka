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
    headerHeight: 64,
    subheaderHeight: 50,
    threadWidth: 981,

    homeViewID: 'HomeView',
    contentViewID: 'ContentView',
    settingsViewID: 'SettingsView',

    iconPackName: 'lurka',
    icons: {

        home: "", // TODO: Set this

        // navbarMenu: "navicon",
        navbarForwards: "arrow-big-right",
        navbarBackwards: "arrow-big-left",

        navbarInfo: 'information',
        navbarRefresh: 'refresh',

        navbarAccount: 'person-add',
        navbarArchive: 'box',
        navbarDB: 'data',
        navbarEye:     'eye-1',
        navbarSettings: 'cog',

        subNavbarOpen: 'chevron-down',
        subNavbarClose: 'chevron-up',

        searchMagnify: "search-1",
        searchClose: "times",

        // videoFullscreen: "arrow-expand",
        videoPlay: "play",
        videoPause: "pause",
        videoError: "warning-alt",
        videoVolumeOff: "volume-disabled",
        videoVolumeMute: "volume-mute",
        videoVolumeLow: "volume-low",
        videoVolumeMedium: "volume-med",
        videoVolumeHigh: "volume-high",

        boardPostReplyCount: "mesage-1",
        boardPostImageCount: "image",

        // threadPostImageFullscreen: 'arrow-expand',

        threadPostMenu: 'dot-3',
        threadPostControlsReport: "flag",
        threadPostControlsDownload: "download-1", // TODO: Change
        threadPostControlsReply: "quote",
        threadPostControlsImageSearch: "search-2",
        threadPostControlsHide: "minus-circle",

        watchPanelClose: "times",
        // watcchPanelUpdate: "update",

        "footerSort": "bar-chart",
        "footerFilter": "filter-outline",
        "footerLayout": "layout",
        "footerInfo": "info",
        "footerOpen": "chevron-up",
        "footerClose": "chevron-down",
    }
}
