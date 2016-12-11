import fs from 'fs'

export function parseBoardList(boardList) {
    // console.log(JSON.stringify(boardList))
    try {
        boardList.data.children
    } catch (e) {
        return log.error(`Bad reddit data returned: ${e}`)
    }

    const boards = boardList.data.children.map(board => board.data) // thanks, reddit!

    return boards.map( board => {
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
            }

        }
    });
}
