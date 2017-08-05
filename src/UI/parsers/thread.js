import API from '-/config/api.4chan';

/**
 * Standardises a 4chan thread.
 *
 * @param  {Object} posts   - Directly from 4chan's API
 * @param  {String} boardID - Board ID, used for creating media URLs
 * @return {Array}          - Array of standardised objects
 */
export default function parseThread( posts, boardID ) {
    if (!posts || !posts.length) {
        console.error("parseThread(): No posts supplied")
        console.error(posts)
        console.error(`typeof posts: ${typeof posts}`)
        throw new Error("parseThread: No posts supplied");
    }

    const thread = createPostParser(boardID)(posts)

    console.info(`Created ${thread.length} 4chan posts`);

    try {
        return replaceOPQuotes( connectPosts(thread) );
    } catch (e) {
        console.error(thread)
        console.error(e)
        return thread
    }
}

export const createPostParser = (boardID) => {
    const thumbUrl = API.thumbnail(boardID)
    const mediaUrl = API.media(boardID)

    return (posts) => posts.map(postParser);

    // Hoisted
    function postParser(post, index) {
        const ext = post.ext
        const smImg = thumbUrl + post.tim + "s.jpg"
        const lgImg = mediaUrl + post.tim + ext

        const regularPost = {
            id: post.no,
            date: post.now,
            name: post.name,
            hash: post.md5,
            title: post.sub || "",
            time: post.tim || post.time * 1000,
            comment: post.com,
            media: !!ext ? {
                thumbnail: smImg,
                srcLarge: lgImg,
                width: post.w,
                height: post.h,
                filesize: post.fsize,
                filename: post.filename,
                filetype: ext
            } : null
        }

        if (index === 0 ) {
            // Update post with OP specific metadata
            return Object.assign({}, regularPost, {
                tail_call: post.tail_call,
                replies: post.replies,
                unique_ips: post.unique_ips,
                images: post.images,
            })
        }

        return regularPost
    }
}


/**
 * Connects thread posts by checking who referenced who then merging
 * inserting a new `references` attr into posts
 *
 * @param  {Array} posts - Each thread post
 * @return {Array}       - Posts merged with references
 *
 */
export const connectPosts = (posts) => {
    const ids = posts.map( post => post.id);
    const references = ids.map( (id, index) => {
        var references = [];

        // Check all comments against the current id
        posts.map( ({ id:referer, comment }) => {
            if (comment && comment.includes(id)) {
                references.push(referer)
            }
        })

        return references
    });

    // Merge references back into original posts
    for (let i=0; i < ids.length; i++) {
        posts[i].references = references[i]
    }

    return posts
}


/**
 * Every quote that references OP (the first comment) is highlighted
 * So `>>123456` would become `>>123456 (OP)`
 *
 * @param  {Array} posts - Contains parsed thread post objects
 * @return {Array}
 */
export const replaceOPQuotes = (posts) => {
    if (!posts || !posts.length || !posts[0].id) {
        return posts
    }

    const OPID = `&gt;${posts[0].id}`;
    const replace = `${OPID} (OP)`;

    return posts.map(post => {
        let c = post.comment;

        if (c && c.includes(OPID)) {
            post.comment = c.replace(OPID, replace);
        }

        return post
    });
}
