import { createSelector } from 'reselect';

// State
export const getBoardListItems = (state) => state.boardList.items
export const getFavouriteBoardIDs = (state) => state.boardList.favourites

// Operations
export const isFavouriteBoard = (state, boardID) =>
    getFavouriteBoards(state)
        .find(el => el.boardID === boardID)

export const getBoardsOrderedAlphabetically = createSelector(
    getBoardListItems,
    (boards) => {
        return boards.sort((a, b) => {
            a = a.boardID.toLowerCase()
            b = b.boardID.toLowerCase()
            if (a < b)
                return -1
            if (a > b)
                return 1
            return 0
        })
    }
);

export const getFavouriteBoards = createSelector(
    getFavouriteBoardIDs,
    getBoardListItems,
    (faveIDs, boards) =>
        faveIDs.map( boardID =>
            boards.find( board => board.boardID === boardID))
)