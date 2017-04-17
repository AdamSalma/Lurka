import {
    BOARD_SCROLLED_TO_BOTTOM,
    BOARD_DESTROYED,
    BOARD_SAVED_TO_HISTORY,
    BOARD_LOADED_FROM_HISTORY,
} from '../types'


export function loadMorePosts( limit ) {
    return (dispatch, getState) => {
        if ( shouldLoadMorePosts(getState(), limit) ) {
            dispatch({
                type: BOARD_SCROLLED_TO_BOTTOM,
                payload: limit
            })
        }
    }
}

function shouldLoadMorePosts({ board }, limitToSet) {
    return limitToSet < board.posts.length
}


export function destroyBoard() {
    console.log("Action destroyBoard()")
    return (dispatch, getState) => {
        const state = getState()
        if ( shouldDestroyBoard(state) ) {
            console.warn("Board Destroyed! yay")
            dispatch(saveBoardToHistory(state))
            dispatch({type: BOARD_DESTROYED})

        }
    }
}

function shouldDestroyBoard({ board }) {
    return board.posts.length
}
