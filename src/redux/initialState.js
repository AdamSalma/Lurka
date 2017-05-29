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
        update: [/*
            {
                type: "thread",
                interval: 3000,
                lastUpdated: UNIX_TS,
                url: '/boardID/threadID'
            }
        */],
        updated: [/*
        e.g.
            {
                type: "thread",
                updatedAt: UNIX_TS,
                newPosts: []
            }
        */]
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
