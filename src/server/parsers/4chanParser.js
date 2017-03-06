import proxify from '../services/proxyUrls';
import {fourchanAPI} from '../config/apiEndpoints';


/**
 * Standardises a 4chan board.
 * 
 * @param  {Object} board   - Directly from 4chan's API
 * @param  {String} boardID - ID used to request board with
 * @return {Array}          - Extracted posts
 */
export function parseBoard( board, boardID ) {
    log.app(`Parsing 4chan board ${boardID} ...`)
    const _board = []
    const {image: imgUrl, thumbnail: thumbUrl} = fourchanAPI(boardID)

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
        let lgImg = imgUrl + post.tim + post.ext

        _board.push({
            id: post.no,
            date: post.now,
            title: post.sub || "",
            comment: post.com,
            time: post.tim || post.time * 1000,
            media: {
                thumbnail: smImg,
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


/**
 * Standardises a 4chan thread.
 * 
 * @param  {Object} posts   - From the API
 * @param  {[type]} boardID - Board ID, used for creating media URLs
 * @return {[type]}         [description]
 */
export function parseThread( posts, boardID ) {
    if (!posts || !posts.length) {
        log.error("parseThread(): No posts supplied")
        throw new Error(posts);
    }

    const {image: imgUrl, thumbnail: thumbUrl} = fourchanAPI(boardID)
    

    const thread = posts.map( post => {
        let ext = post.ext
        let smImg = thumbUrl + post.tim + "s.jpg"
        let lgImg = imgUrl + post.tim + ext

        return {
            id: post.no,
            date: post.now,
            name: post.name,
            hash: post.md5,
            title: post.sub || "",
            time: post.tim || post.time * 1000,
            comment: post.com,
            media: !!ext ? {
                thumbnail: smImg,
                srcLarge: proxify(lgImg),
                width: post.w,
                height: post.h,
                filesize: post.fsize,
                filename: post.filename,
                filetype: ext
            } : null
        }
    });

    log.app(`Created ${posts.length} 4chan posts`);

    try {
        return connectPosts(thread)
    } catch (e) {
        console.error(thread)
        log.error(e)
        return thread
    }
}


/**
 * Connects thread posts by checking who referenced who then merging 
 * references back into posts
 * 
 * @param  {Array} posts - Each thread post
 * @return {Array}       - Posts merged with references
 * 
 */
function connectPosts(posts) {
    // returns a list of IDs that quoted the current ID
    const ids = posts.map( post => post.id);
    const references = ids.map( (id, index) => {
        var refs = [];
        posts.map( ({ id:referer, comment }) => {
            // Check all comments for ID, add any that refer to ID
            if (comment && comment.includes(id)) {
                refs.push(referer)
            }
        })
        return refs
    });
    
    for (let i=0; i < ids.length; i++) {
        posts[i].references = references[i]
    }
    return posts
}


export function parseBoardList( boardList ) {
    log.app(`Discovered ${boardList.length} 4chan boards`);
    return boardList.map( board => {
        // Essential stuff
        const { board: boardID, title, meta_description } = board
        const url = `/${boardID}/`;

        // Board info
        const { 
            is_archived, 
            max_filesize,
            max_comment_chars, 
            image_limit, 
            max_webm_duration, 
            max_webm_filesize, 
            ws_board } = board

        return {
            boardID, 
            title,
            url,
            short_desc: `${url} - ${title}`,
            description: meta_description,
            info: {
                is_archived, 
                max_filesize,
                max_comment_chars, 
                image_limit, 
                max_webm_duration, 
                max_webm_filesize, 
                NSFW: 1 - ws_board
            }
        }

    });
}

