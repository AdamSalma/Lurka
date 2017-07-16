export default {
    boardlist: () =>
        `http://a.4cdn.org/boards.json`,
    board: (boardID) =>
        `http://a.4cdn.org/${boardID}/catalog.json`,
    thread: (boardID, threadID) =>
        `http://a.4cdn.org/${boardID}/thread/${threadID}.json`,
    archive: (boardID) =>
        `http://a.4cdn.org/${boardID}/archive.json`,
    media: (boardID) =>
        `https://i.4cdn.org/${boardID}/`,
    thumbnail: (boardID) =>
        `https://t.4cdn.org/${boardID}/`,
}
