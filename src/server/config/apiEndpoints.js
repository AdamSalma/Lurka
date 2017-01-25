/**
 * External API endpoints for various resources
 */

export const fourchanAPI = function(boardID, threadID) {
    return {
        boardlist: `http://a.4cdn.org/boards.json`,
        board: `https://a.4cdn.org/${boardID}/catalog.json`,
        thread: `http://a.4cdn.org/${boardID}/thread/${threadID}.json`,
        archive: `https://a.4cdn.org/${boardID}/archive.json`,
        image: `https://i.4cdn.org/${boardID}/`,
        thumbnail: `https://t.4cdn.org/${boardID}/`,
    }
}

export const redditAPI = {
    subreddits: ({type="default", limit=100}) => {
        // @param type  - default, popular, new, gold
        // @param limit - the maximum number of items desired (default: 25, maximum: 100)
        return `http://reddit.com/subreddits/${type}/.json?limit=${limit}`
    },
    search_subreddits: ({query}) => {
        if (!query) {
            throw new Error('No query supplied')
        }

        return `https://www.reddit.com/search/.json?q=${query}`
    },
    board: ({boardID, limit=100}) => {
        if (!boardID) {
            throw new Error('No boardID supplied to reddit')
        }

        return `https://www.reddit.com/r/${boardID}/.json?limit=${limit}`

    }
}

