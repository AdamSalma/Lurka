import * as types from '~/redux/types';
import { getBoardPosts } from '~/redux/selectors/board';

export default function destroyBoard() {
    console.log("Action destroyBoard()");

    return (dispatch, getState) => {
        const state = getState()
        if ( shouldDestroyBoard(state) ) {
            console.warn("Board Destroyed! yay")
            dispatch(boardDestroyed());
        }
    }
}

export const shouldDestroyBoard = (state) => getBoardPosts(state).length > 0

export const boardDestroyed = () => ({ type: types.BOARD_DESTROYED })
