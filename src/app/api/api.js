import endpoints from 'config/api.4chan'
import Parser from './parser'

export default class Api {
    constructor(client) {
        this.client = client
    }

    fetchBoard(boardID, config) {
        const url = endpoints.board(boardID);
        return this.client
            .get(url, config)
            .then(res => res.data)
            .then(board => Parser.parseBoard(board, boardID))
    }

    fetchThread({ boardID, threadID }, config) {
        const url = endpoints.thread(boardID, threadID);
        return this.client
            .get(url, config)
            .then(res => {
                const thread = res.data.posts;
                return {
                    thread: Parser.parseThread(thread, boardID),
                    lastModified: res.headers["last-modified"] || 0
                }
            })
    }

    fetchBoardList(config) {
        const url = endpoints.boardlist();
        return this.client
            .get(url, config)
            .then(res => res.data.boards)
            .then(boardList => Parser.parseBoardList(boardList))
    }

    fetchArchive({boardID, threadID}) {
        // TODO:  Web scrape archive and parse into consumable structure
    }

    submitThreadPost() {

    }
}
