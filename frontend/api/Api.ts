import endpoints from "config/api.4chan";
import Parser from "./parser";
import Axios from "axios";
import BoardDTO from "./dto/BoardDTO";
import ThreadDTO from "./dto/ThreadDTO";
import BoardListDTO from "./dto/BoardListDTO";

const client = Axios.create();

export default class Api {
  static fetchBoard(boardId, config = {}) {
    const url = endpoints.board(boardId);
    return client
      .get(url, config)
      .then((res) => res.data)
      .then((board) => Parser.parseBoard(board, boardId))
      .then((parsedBoard) => BoardDTO.fromParsedEntity(boardId, parsedBoard));
  }

  static fetchThread({ boardId, threadId }, config = {}) {
    const url = endpoints.thread(boardId, threadId);
    return client
      .get(url, config)
      .then((res) => {
        const thread = res.data.posts;
        return {
          parsedThread: Parser.parseThread(thread, boardId),
          lastModified: res.headers["last-modified"] || 0,
        };
      })
      .then(({ parsedThread, lastModified }) =>
        ThreadDTO.fromParsedEntity(parsedThread, {
          boardId,
          threadId,
          lastModified,
        })
      );
  }

  static fetchBoardList(config = {}) {
    const url = endpoints.boardlist();
    return client
      .get(url, config)
      .then((res) => res.data.boards)
      .then((boardList) => Parser.parseBoardList(boardList))
      .then((parsedBoardList) =>
        BoardListDTO.fromParsedEntity(parsedBoardList)
      );
  }

  static fetchArchive({ boardId, threadId }) {
    // TODO:  Web scrape archive and parse into consumable structure
  }

  static submitThreadPost() {}
}
