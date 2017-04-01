import API from '../../config/4chanAPI';
import proxify from '../services/proxyUrls';

/**
 * Standardises a 4chan thread.
 * 
 * @param  {Object} posts   - Directly from 4chan's API
 * @param  {String} boardID - Board ID, used for creating media URLs
 * @return {Array}          - Array of standardised objects
 */
export default function parseThread( posts, boardID ) {
    if (!posts || !posts.length) {
        log.error("parseThread(): No posts supplied")
        log.error(posts)
        log.error(`typeof posts: ${typeof posts}`)
        throw new Error("parseThread: No posts supplied");
    }

    const thumbUrl = API.thumbnail(boardID)
    const mediaUrl = API.media(boardID)    

    const thread = posts.map( post => {
        let ext = post.ext
        let smImg = thumbUrl + post.tim + "s.jpg"
        let lgImg = mediaUrl + post.tim + ext

        return {
            id: post.no,
            date: post.now,
            name: post.name,
            hash: post.md5,
            title: post.sub || "",
            time: post.tim || post.time * 1000,
            comment: post.com,
            media: !!ext ? {
                thumbnail: proxify(smImg),
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
