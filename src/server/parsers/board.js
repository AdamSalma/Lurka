import API from '-/config/api.4chan';
import proxify from '../services/proxyUrls';


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

    log.app(`Parsing 4chan board ${boardID} ...`)

    try {
        for (let page in board) {
            if (!board.hasOwnProperty(page)) return false;
            board[page].threads.map( post => formatPost(post))
        }
    } catch (e) {
        log.error(e)
        log.error(board)
        throw new Error(board)
    }


    if (!_board.length) {
        throw new Error("4chan board was not parsed: No posts extracted")
    }

    log.app(`Created ${_board.length} board posts`)
    return _board;

    function formatPost(post) {
        let smImg = thumbUrl + post.tim + "s.jpg"
        let lgImg = mediaUrl + post.tim + post.ext

        _board.push({
            id: post.no,
            date: post.now,
            title: post.sub || "",
            comment: post.com,
            time: post.tim || post.time * 1000,
            media: {
                thumbnail: proxify(smImg),
                srcLarge: proxify(lgImg),
                width: post.w,
                height: post.h,
                filesize: post.fsize,
            },
            replies: {
                textCount: post.replies,
                imgCount: post.images,
            },
            last_modified: post.last_modified
        });
    }
}
