import Endpoints from "../Endpoints";

class BoardPostDTO {
  id: number;
  date?: string;
  title?: string;
  comment?: string;
  time?: number;
  last_modified?: number;

  mediaThumbnail?: string;
  mediaSrcLarge?: string;
  mediaWidth?: number;
  mediaHeight?: number;
  mediaFilesize?: number;

  replyTextCount?: number;
  replyImgCount?: number;

  static fromParsedEntity(boardId: string, boardPost: any) {
    const tim = boardPost["tim"] ?? boardPost["time"] * 1000;
    const ext = boardPost["ext"] ?? ".jpg";

    const mediaThumbnail = Endpoints.thumbnail(boardId, tim);
    const mediaSrcLarge = Endpoints.media(boardId, tim, ext);

    const boardPostDto = new BoardPostDTO();

    boardPostDto.id = boardPost["no"];
    boardPostDto.date = boardPost["now"];
    boardPostDto.title = boardPost["sub"] ?? "";
    boardPostDto.comment = boardPost["com"] ?? "";
    boardPostDto.time = tim;

    boardPostDto.last_modified = boardPost["last_modified"];

    boardPostDto.mediaThumbnail = mediaThumbnail;
    boardPostDto.mediaSrcLarge = mediaSrcLarge;
    boardPostDto.mediaWidth = boardPost["w"] ?? 0;
    boardPostDto.mediaHeight = boardPost["h"] ?? 0;
    boardPostDto.mediaFilesize = boardPost["fsize"] ?? 0;

    boardPostDto.replyTextCount = boardPost["replies"];
    boardPostDto.replyImgCount = boardPost["images"];

    return boardPostDto;
  }
}

export default class BoardDTO {
  // Map<string, BoardPostDTO> postsById = {};

  constructor(public boardId: string, public posts: Array<BoardPostDTO>) {}

  getPostsSortedBy(sortType: EBoardSort): Array<BoardPostDTO> {
    if (sortType == EBoardSort.replyCount) {
      const sortedByReplyCount = [...this.posts];
      sortedByReplyCount.sort(
        (a, b) => (b.replyTextCount ?? 0) - (a.replyTextCount ?? 0)
      );
      return sortedByReplyCount;
    }
  }

  static fromParsedEntity(boardId: string, data: Array<any>) {
    const posts: Array<BoardPostDTO> = [];

    for (var pageJson in data) {
      for (var boardItemJson in pageJson["threads"]) {
        const formattedPost = BoardPostDTO.fromParsedEntity(
          boardId,
          boardItemJson
        );

        posts.push(formattedPost);
      }
    }

    return new BoardDTO(boardId, posts);
  }
}

enum EBoardSort {
  replyCount,
  creationDate,
  bumpOrder,
  lastReply,
}
