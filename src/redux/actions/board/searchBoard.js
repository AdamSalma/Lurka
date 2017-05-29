import * as types from '~/redux/types';
import { getBoardPosts } from '~/redux/selectors/board';

export default function searchBoard (searchTerm) {
    console.log("Action searchBoard()");

    return dispatch =>
        dispatch(boardSearched(searchTerm));
}

export const boardSearched = (searchTerm) => ({
    type: types.BOARD_SEARCHED,
    payload: searchTerm
})
