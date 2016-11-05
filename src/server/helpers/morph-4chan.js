/**
 * Standardises a 4chan board.
 * 
 * @param  {Object} board   - Directly from 4chan's API
 * @param  {String} boardID - ID used to request board with
 * @return {Array}          - Extracted posts
 */
export function morphBoard( board, boardID ) {
    const img = `https://i.4cdn.org/${boardID}/`;
    var newBoard = [];

    console.log("Parsing 4chan board");

    for (let page in board) {
        if (!board.hasOwnProperty(page)) return false;
        let threads = board[page]['threads'];
		for (let i = 0; i < threads.length; i++) {
		    formatThread(threads[i]);
		}
    }

    if (!newBoard.length) throw new Error("No threads extracted");
    console.log(`Created ${newBoard.length} threads`);
    return newBoard;

    function formatThread(threadObj) {
        let thread = {
        	id: threadObj['no'],
        	date: threadObj['now'],
            title: threadObj['sub'] || "",
            comment: threadObj['com'],
            time: threadObj['tim'] || threadObj['time'] * 1000,
            imgsrc: {
                sm: img + threadObj['tim'] + "s.jpg",
                lg: img + threadObj['tim'] + ".jpg",
            },
            replies: {
                textCount: threadObj['replies'],
                imgCount: threadObj['images'],
                ipCount: threadObj['unique_ips']
            }
        }
        newBoard.push(thread);
    }
}


/**
 * Standardises a thread.
 * 
 * @param  {Object} posts   - From the API
 * @param  {[type]} boardID - Board ID, used for creating media URLs
 * @return {[type]}         [description]
 */
export function morphThread( posts, boardID ) {
    const img = `https://i.4cdn.org/${boardID}/`;

    if (!posts.length) throw new Error("No thread posts supplied");
    console.log(`Created ${posts.length} 4chan posts`);

    
    const thread = posts.map( post => ({
        id: post['no'],
        date: post['now'],
        title: post['sub'] || "",
        time: post['tim'] || post['time'] * 1000,
        comment: post['com'],
        imgsrc: !!post['ext'] ? {
            sm: img + post['tim'] + "s.jpg",
            lg: img + post['tim'] + post['ext']
        } : null,
        ext: post['ext']
    }));

    try {
        return connectPosts(thread)
    } catch (e) {
        console.log(thread)
        console.log(e)
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
            // Check if ID is in all posts; add id of any who tagged it
            if (comment && comment.includes(id)) refs.push(referer)
        })
        return refs
    });
    
    for (let i=0; i < ids.length; i++) {
        posts[i].references = references[i]
    }

    console.log(`Connected ${posts.length} posts`);
    return posts
}


export function extractBoardList( boardList ) {
    return boardList.map( ({ board, title }) => ({
        value: board, 
        text: `/${board}/ - ${title}`
    }));
}