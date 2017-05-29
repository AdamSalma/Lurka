import * as types from '~/redux/types';
import {isFavouriteBoard} from '~/redux/selectors';

export default function removeBoardFromFavourites(boardID) {
    return (dispatch, getState) => {
        if (!isFavouriteBoard(getState(), boardID)) {
            console.warn(`${boardID} was already not in favovurites`);
            return
        }

        dispatch(removeFavouriteBoard(boardID));
    }
}

export const removeFavouriteBoard = (boardID) => {
    return {
        type: types.BOARD_LIST_REMOVE_FAVOURITE,
        payload: boardID
    }
}
