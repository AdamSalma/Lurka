class BoardListItemDTO {
  id: string;
  title: string;

  static fromParsedEntity(boardListItem: any) {
    const instance = new BoardListItemDTO();

    instance.id = boardListItem["board"];
    instance.title = boardListItem["title"];

    return instance;
  }
}

export default class BoardListDTO {
  boardInfo: Array<BoardListItemDTO> = [];
  boardInfoMap: Record<string, BoardListItemDTO> = {};

  getBoardInfo(boardId: string) {
    try {
      return this.boardInfoMap[boardId];
    } catch (e) {
      console.error(JSON.stringify(this.boardInfoMap, null, 2), e);
    }
  }

  // sortedBy(sortType) {
  //   // if (sortType == 0) {
  //   // const sortedByReplyCount = [...this.boardInfo];
  //   // sortedByReplyCount.sort(
  //   //     (a, b) => (a.replyTextCount ?? 0).compareTo(b.replyTextCount ?? 0));
  //   // return boardInfo;
  //   // }
  // }

  static fromParsedEntity(boardList: Array<any>) {
    const instance = new BoardListDTO();

    for (var item in boardList) {
      const boardInfoItem = BoardListItemDTO.fromParsedEntity(item);

      instance.boardInfo.push(boardInfoItem);
      instance.boardInfoMap[boardInfoItem.id] = boardInfoItem;
    }

    return instance;
  }
}
