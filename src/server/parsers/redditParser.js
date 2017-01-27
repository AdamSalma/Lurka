import proxify from '../services/proxyUrls';


export function parseBoardList(boards) {
    return boards.data.children.map(({data: board }) => {
        // Essentials
        const { url, title, public_description } = board
        let boardID = url.split('/').slice(-2)[0]
        
        // Board info
        const { subscribers, over18, icon_img } = board

        return {
            url, 
            boardID,
            title,
            short_desc: `/${boardID}/ - ${title}`,
            description: public_description,
            info: {
                subscribers, 
                NSFW: over18, 
                icon_img
            },
            provider: "reddit"
        }
    });
}


export function parseBoard(board) {
    return board.data.children.map(({data: post }) => {
        return {
            id: post.id,
            title: post.title,
            comment: post.selftext || '',
            date: post.created || post.created_utc,
            author: post.author,
            replies: {
                textCount: post.num_comments,
                ups: post.ups,
                downs: post.downs
            },
            NSFW: post.over_18,
            media_embed: post.media_embed,
            media: {
                is_external: !post.domain.includes('self'),
                thumbnail: proxify("/media", {url: post.media ? post.media.thumbnail_url : post.thumbnail, provider: "reddit"}), 
            }
        }
    })
}


