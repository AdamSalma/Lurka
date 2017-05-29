export const getFavouriteBoards = (state) => state.boardList.favourites

export const isFavouriteBoard = (state, boardID) =>
    getFavouriteBoards(state)
        .find(el => el.boardID === boardID)
