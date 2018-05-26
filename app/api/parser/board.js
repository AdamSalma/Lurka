import API from 'config/api.4chan';

/**
 * Standardises a 4chan board.
 *
 * @param  {Object} board   - Directly from 4chan's API
 * @param  {String} boardID - ID used to request board with
 * @return {Array}          - Array of standardised objects
 */
export default function parseBoard( board, boardID ) {
    const _board = []
    const thumbUrl = API.thumbnail(boardID)
    const mediaUrl = API.media(boardID)

    console.group('%cBoard API parse', 'color: skyblue');
    console.log(`Board ID: /${boardID}/`);

    for (let page in board) {
        board[page].threads.map( post => formatPost(post, page));
    }

    if (!_board.length) {
        throw new Error("No posts extracted in parseBoard. Input:", board);
    }

    console.log(`Created ${_board.length} board posts`);
    console.log("Board:", _board)
    console.groupEnd();

    return _board;

    function formatPost(post, page) {
        let smImg = thumbUrl + post.tim + "s.jpg"
        let lgImg = mediaUrl + post.tim + post.ext

        _board.push({
            id: post.no,
            date: post.now,
            title: post.sub || "",
            comment: post.com,
            time: post.tim || post.time * 1000,
            page: page,
            last_modified: post.last_modified,
            media: {
                thumbnail: smImg,
                srcLarge: lgImg,
                width: post.w,
                height: post.h,
                filesize: post.fsize,
            },
            replies: {
                textCount: post.replies,
                imgCount: post.images,
            },
        });
    }
}
