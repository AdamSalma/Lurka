import Endpoints from "../Endpoints";

class ThreadPostDTO {
  id: number;
  date: Date;
  name?: string;
  comment?: string;
  time: number;
  md5Hash?: string;
  replyReferences: Array<number> = [];

  hasMedia = false;
  mediaThumbnail?: string;
  mediaSrcLarge?: string;
  mediaWidth?: number;
  mediaHeight?: number;
  mediaFilesize?: number;
  mediaFilename?: string;
  mediaFiletype?: string;

  // OP fields
  isOP = false;
  OPTitle?: string;
  OPRepliesCount?: number;
  OPUniqueIpsCount?: number;
  OPImagesCount?: number;

  static fromParsedEntity({
    isOP,
    boardId,
    comment,
    threadItem,
    replyReferences,
  }: {
    isOP: boolean;
    boardId: string;
    comment?: string;
    threadItem: Record<string, any>;
    replyReferences: Array<number>;
  }): ThreadPostDTO {
    const tim = threadItem["tim"] ?? threadItem["time"] * 1000;
    const ext = threadItem["ext"] ?? ".jpg";

    const instance = new ThreadPostDTO();

    instance.id = threadItem["no"];
    instance.isOP = isOP;
    instance.date = new Date(
      isOP ? threadItem["time"] * 1000 : (tim as number)
    );
    instance.name = threadItem["name"];
    instance.md5Hash = threadItem["md5"];
    instance.time = tim;
    instance.comment = comment ?? "";
    instance.replyReferences = [];

    // Media
    if (threadItem["ext"] != null) {
      instance.hasMedia = true;
      instance.mediaThumbnail = Endpoints.thumbnail(boardId, tim);
      instance.mediaSrcLarge = Endpoints.media(boardId, tim, ext);

      instance.mediaWidth = threadItem["w"];
      instance.mediaHeight = threadItem["h"];
      instance.mediaFilesize = threadItem["fsize"];
      instance.mediaFilename = threadItem["filename"];
      instance.mediaFiletype = ext;
    }

    // Update post with OP specific metadata
    if (instance.isOP) {
      instance.OPTitle = threadItem["sub"] ?? "";
      instance.OPRepliesCount = threadItem["replies"];
      instance.OPUniqueIpsCount = threadItem["unique_ips"];
      instance.OPImagesCount = threadItem["images"];
    }

    return instance;
  }
}

export default class ThreadDTO {
  posts: Array<ThreadPostDTO> = [];
  postsById: Record<number, ThreadPostDTO> = {};
  postsContainingMedia: Array<number> = [];

  constructor(
    public boardId: string,
    public threadId: string,
    public lastModified?: number
  ) {}

  // Array<ThreadPostDTO>? getPostsSortedBy(ThreadSort sortType) {
  //   if (sortType == ThreadSort.replyCount) {
  //     const sortedByReplyCount = [...this.posts];
  //     sortedByReplyCount.sort(
  //         (a, b) => (a.replyTextCount ?? 0).compareTo(b.replyTextCount ?? 0));
  //     return sortedByReplyCount;
  //   }
  // }

  static fromParsedEntity(
    thread: Array<Record<string, any>>,
    { boardId, threadId, lastModified }
  ) {
    const instance = new ThreadDTO(boardId, threadId, lastModified);
    const posts = [];
    const postsById = {};
    const postsContainingMedia = [];

    thread.forEach((threadPost, index) => {
      const post = ThreadPostDTO.fromParsedEntity({
        isOP: index === 0,
        boardId,
        comment: threadPost.comment,
        replyReferences: threadPost.replyReferences,
        threadItem: threadPost,
      });

      posts.push(post);
      postsById[post.id] = post;
      if (post.hasMedia) {
        postsContainingMedia.push(post);
      }
    });

    instance.posts = posts;
    instance.postsById = postsById;
    instance.postsContainingMedia = postsContainingMedia;

    return instance;
  }
}

enum ThreadSort {
  creationDate,
  replyCount,
  longest,
}
