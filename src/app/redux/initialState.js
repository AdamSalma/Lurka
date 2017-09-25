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
        receivedAt: 0,
        items: [],
        favourites: []
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
        lastModified: 0  // Last-Modified header - recieved from the initial request and used to perform updates.
    },

    watcher: {
        lastRequestAt: 0,  // unix timestamp
        entities: {
            queue: [
                /*{
                    id: 'boardId' or 'boardId/threadId'
                    url: 'http://4chan/g',
                    lastModified: 0  // is response header. Set initially from thread, then from updates
                }*/
            ],
            results: {
                // 'id': response.content
            },
            metadata: {
                /*
                id: {
                    // board.post.replies
                    // thread.posts.length
                    postsCount: 42,

                    // board.post.last_modified
                    // thread.lastModified
                    lastModified: 1502627939,  // normalise to int timestamp

                    op: {title, media, comment},

                    isFetching: true,  // TODO: dispatch action before updating. WATCH_ENTITY_UPDAT
                }
                */
            }
        }
    },

    post: {
        isOpen: false,
        position: null,  // center/left (depending on viewport + context)
        context: null,  // board/thread
        isAuthenticated: false,
        entities: {
            references: [],
            message: null,  // user input
            upload: null
        }
    },

    cinema: {
        isActive: false,
        isGridActive: false,
        entities: {
            count: 0,
            viewPosition: 0,
            timeline: {
                previous: [],
                current: null,
                next: [],

            }
        }
    },

    settings: {
        internal: {
            // Internal settings that the user should not have access to
            requestThrottle: 3,
            maxBoardAge: 900,  // 15 mins
            maxThreadAge: 900,  // 15 mins
        },

        // External settings the user can configure:
        homeBoard: 'g',
        nsfw: false,
        downloadLocation: '~/Downloads/Lurka',
        boardUpdateInterval: 15,
        threadUpdateInterval: 5,
        autoMute: false,

        // Details for non-internal settings. Used for providing descriptions etc to user.
        details: settingDetails
    }
}
