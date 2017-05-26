import * as types from '~/redux/types';
import {isFavouriteBoard} from '~/redux/selectors';

export default function addBoardToFavourites(boardID) {
    return (dispatch, getState) => {
        if (!isFavouriteBoard(getState(), boardID)) {
            console.warn(`${boardID} is already in favourites`);
            return
        }

        dispatch(addFavouriteBoard(boardID));
    }
}

export const addFavouriteBoard = (boardID) => {
    return {
        type: types.BOARD_LIST_ADD_FAVOURITE,
        payload: boardID
    }
}
