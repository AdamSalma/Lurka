export default {
    boardlist: () =>
        `/api/4chan/boards`,
    board: boardID =>
        `/api/4chan/board/${boardID}`,
    archive: boardID =>
        `/api/4chan/${boardID}/archive`,
    thread: (boardID, threadID) =>
        `/api/4chan/board/${boardID}/thread/${threadID}`,
}
