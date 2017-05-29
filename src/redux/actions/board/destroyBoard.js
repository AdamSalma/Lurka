import * as types from '~/redux/types';
import { getBoardPosts } from '~/redux/selectors/board';

export default function destroyBoard() {
    console.log("Action destroyBoard()");

    return (dispatch, getState) => {
        const state = getState()
        if ( shouldDestroyBoard(state) ) {
            console.warn("Board Destroyed! yay")
            dispatch({type: types.BOARD_DESTROYED});
        }
    }
}

export function shouldDestroyBoard(state) {
    return getBoardPosts(state).length > 0
}
