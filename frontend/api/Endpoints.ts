const Endpoints = {
  boardInfo: () => `http://a.4cdn.org/boards.json`,

  board: (boardID: string) => `http://a.4cdn.org/${boardID}/catalog.json`,

  thread: (boardID: string, threadID: string) =>
    `http://a.4cdn.org/${boardID}/thread/${threadID}.json`,

  archive: (boardID: string) => `http://a.4cdn.org/${boardID}/archive.json`,

  media: (boardID: string, id: string, ext: string) =>
    `https://i.4cdn.org/${boardID}/${id}${ext}`,

  thumbnail: (boardID: string, id: string) =>
    `https://i.4cdn.org/${boardID}/${id}s.jpg`,
};

export default Endpoints;
