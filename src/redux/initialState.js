import { details as settingDetails } from './settings'

export default {
    status: {
        alertMessage: null,  // reveal status to user
        provider: '4chan',
        boardID: null,
        threadID: null,
        searchWord: null,
        filterWords: [],
    },

    boardList: {
        didInvalidate: false,
        favourites: [],
        items: []
    },

    cache: {
        board: { },
        thread: { }
    },

    board: {
        receivedAt: 0,  // unix timestamp
        isFetching: false,
        didInvalidate: false,
        posts: [],
        filters: [],
        search: ''
    },

    thread: {
        receivedAt: 0,  // unix timestamp
        isActive: false,
        isFetching: false,
        didInvalidate: false,
        isBeingWatched: false,
        posts: [],
    },

    watch: {
        lastRequestAt: 0, // unix timestamp
        entities: {
            next: null,
            byId: [/*
                {
                    url: '/api/4chan/g',       // API url to monitor
                    interval: 10,              // seconds to pause for
                    type: BOARD_UPDATED,       // Action to use when a url returns a 200 HTTP response code
                    lastRequestAt: 140374197,  // unix timestamp
                    expireOnError: true        // Remove this object when a bad status code occurs, excluding 304s
                },
            */]
        }
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
            // Internal settings that the user should not have access to
            requestThrottle: 3,
            maxBoardAge: 900,  // 15 mins
            maxThreadAge: 900,  // 15 mins
        },

        // External settings the user can configure:
        theme: 'dark',
        homeBoard: 'g',
        nsfw: false,
        downloadLocation: '~/Downloads/Lurka',
        boardUpdateInterval: 15,
        threadUpdateInterval: 5,
        autoMute: false,

        // Details for non-internal settings. Used for providing desciptions etc to user.
        details: settingDetails
    }
}
