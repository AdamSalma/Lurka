/**
 * External API endpoints for various resources
 * @return {Function -> Object}
 */

export const chan = function(boardID, threadID) {
    return {
        boardlist: `http://a.4cdn.org/boards.json`,
        board: `https://a.4cdn.org/${boardID}/catalog.json`,
        thread: `http://a.4cdn.org/${boardID}/thread/${threadID}.json`,
        archive: `https://a.4cdn.org/${boardID}/archive.json`,
        image: `https://i.4cdn.org/${boardID}/`,
        thumbnail: `https://t.4cdn.org/${boardID}/`,
    }
}

export const reddit = function({type="default", limit=50}) {
    // @param type  - default, popular, new, gold
    // @param limit - the maximum number of items desired (default: 25, maximum: 100)
    return {
        subreddits: `http://reddit.com/subreddits/${type}/.json?limit=${limit}`
    }
}

