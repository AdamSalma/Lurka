import fs from 'fs'
export function parseBoardList(boardList) {
    // console.log(JSON.stringify(boardList))
    try {
        boardList.data.children
    } catch (e) {
        log.error(`Bad reddit data returned => ${e}`)
    }

    const boards = boardList.data.children.map(board => board.data) // thanks, reddit!

    return boards.map(({url, title}) => {
        let boardID = url.split('/').slice(-2)[0]
        return {
            boardID,
            description: `/${boardID}/ - ${title}`
        }
    });
}