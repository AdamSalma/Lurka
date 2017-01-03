import Axios from 'axios';
import {
    BOARD_REQUESTED, 
    BOARD_LOADED, 
    BOARD_DESTROYED,

    BOARD_INVALIDATED,

    BOARD_CHANGE,
    BOARD_SCROLLED_BOTTOM,

    BOARD_LIST_REQUESTED,
    BOARD_LIST_LOADED,

    SEARCH_BOARD, 
    BOARD_EXISTS
} from '../constants';
import {alertMessage} from './StatusActions'

function requestBoard(boardID) {
    return {
        type: BOARD_REQUESTED,
        payload: boardID
    }
}

function receiveBoard(board){
    return {
        type: BOARD_LOADED,
        posts: board.data || [],
        receivedAt: Date.now()
    }
}

function invalidateBoard(error) {
    console.error(error)
    return {
        type: BOARD_INVALIDATED
    }
}

function setBoard( boardID ) {
    console.log("Changing board to " + boardID)
    return {
        type: BOARD_CHANGE,
        payload: boardID
    }
}

export function loadMorePosts( limit ) {
    return (dispatch, getState) => {
        if ( shouldLoadMorePosts(getState(), limit) ) {
            dispatch({
                type: BOARD_SCROLLED_BOTTOM,
                payload: limit
            })
        } else {
            dispatch(alertMessage({
                message: `End of board`,
                type: 'info',
                time: 2000
            }))
        }
    }
}

function shouldLoadMorePosts({ board }, limitToSet) {
    return limitToSet < board.posts.length
}

export function fetchBoard({ provider, boardID }) {
    console.log(`Action FetchBoard() to /api/${provider}/${boardID}`);
    return (dispatch, getState) => {
        if ( boardInHistory(getState(), boardID)) {
            dispatch({
                type: BOARD_EXISTS
            })

        } else if ( canRequestBoard(getState()) ){

            dispatch(requestBoard(boardID))
            dispatch(alertMessage({
                message: `Requesting /${boardID}/`,
                type: "info"
            }))

            return Axios.get(`/api/${provider}/${boardID}`)
                .then( data => {
                    dispatch(receiveBoard(data))
                    dispatch(setBoard(boardID))
                })
                .catch( err => {
                    dispatch(invalidateBoard(err))
                    dispatch(alertMessage({
                        message: err,
                        type: "error",
                        time: 20000
                    }))
                });
        }
    }
}

function canRequestBoard({ thread, settings: { requestThrottle } }) {
    const {isFetching, receivedAt} = thread
    let lastRequested = Date.now() - receivedAt
    console.log(`canRequestBoard(): ${lastRequested} > ${requestThrottle} = ${lastRequested > requestThrottle}`)

    return !isFetching && lastRequested > requestThrottle
}

function boardInHistory({board:{ history }, status}, boardID) {
    return history[boardID] || status === boardID
}

export function destroyBoard() {
    return (dispatch, getState) => {
        if ( shouldDestroyBoard(getState()) ) {
            console.log("Action destroyBoard")
            dispatch({
                type: BOARD_DESTROYED
            })
        }
    }
}

function shouldDestroyBoard({ board:{ boardID }}){
    return boardID
}

export function searchBoard( searchWord ) {
    return dispatch => {
        dispatch({
            type: SEARCH_BOARD,
            payload: searchWord
        })
    }

}

// function requestPosts(reddit) {
//   return {
//     type: REQUEST_POSTS,
//     reddit
//   }
// }
//
// function receivePosts(reddit, json) {
//   return {
//     type: RECEIVE_POSTS,
//     reddit,
//     posts: json.data.children.map(child => child.data),
//     receivedAt: Date.now()
//   }
// }
//
// function fetchPosts(reddit) {
//   return dispatch => {
//     dispatch(requestPosts(reddit))
//     return fetch(`https://www.reddit.com/r/${reddit}.json`)
//       .then(response => response.json())
//       .then(json => dispatch(receivePosts(reddit, json)))
//   }
// }
//
// function shouldFetchPosts(state, reddit) {
//   const posts = state.postsByReddit[reddit]
//   if (!posts) {
//     return true
//   }
//   if (posts.isFetching) {
//     return false
//   }
//   return posts.didInvalidate
// }
//
// export function fetchPostsIfNeeded(reddit) {
//   return (dispatch, getState) => {
//     if (shouldFetchPosts(getState(), reddit)) {
//       return dispatch(fetchPosts(reddit))
//     }
//   }
// }
