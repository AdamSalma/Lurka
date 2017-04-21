import { details as settingDetails } from './settings'

export default {
    status: {
        alertMessage: null,  // reveal status to user
        provider: '4chan',
        boardID: null,
        threadID: null,
    },

    display: {
        isAppReady: false,
        isScrolling: false,  // app scroll
        isHeaderVisible: true,
        isNavbarOpen: false,
        isDrawerOpen: true,
        isThreadOpen: false,
        activeHeaderPanel: null,  // responses to header buttons
    },

    boardList: {
        didInvalidate: false,
        favourites: []  // [{id:'4chan', board: 'g'}, ...]
    },


    board: {
        receivedAt: 0,  // unix timestamp
        isFetching: false,
        didInvalidate: false,
        searchWord: null,
        filterWords: [],
        posts: [],
        limit: 30  // infinite scroll
    },

    boardHistory: { },

    thread: {
        receivedAt: 0,  // unix timestamp
        isActive: false,
        isFetching: false,
        didInvalidate: false,
        isBeingWatched: false,
        posts: [],
    },

    threadHistory: { },

    threadMonitor: {
        newPosts: 0,
        threads: [
            // e.g. {threadID, boardID, posts}
        ]
    },


    post: {
        isAuthenticated: false,
        type: null,  // thread/comment
        references: [],
        message: null,  // user input
        upload: null
        // canReply
    },

    settings: {
        internal: {
            requestThrottle: 3,
            maxBoardAge: 900,  // 15 mins
            maxThreadAge: 900,  // 15 mins
        },

        external: {
            theme: 'dark',
            homeBoard: 'g',
            nsfw: false,
            downloadLocation: '~/Downloads/Lurka',
            boardUpdateInterval: 15,
            threadUpdateInterval: 5,
            autoMute: false
        },

       details: settingDetails
    }
}
