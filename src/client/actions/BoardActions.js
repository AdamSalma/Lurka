import Axios from 'axios';
import {
    BOARD_REQUESTED, 
    BOARD_LOADED, 
    BOARD_DESTROYED,

    BOARD_INVALIDATED,

    BOARD_CHANGE,
    BOARD_SCROLLED_BOTTOM,

    BOARD_LIST_REQUESTED,
    BOARD_LIST_LOADED
} from '../constants';
import {statusMessage, clearStatus} from './StatusActions'

function requestBoard(boardID) {
    return {
        type: BOARD_REQUESTED,
        payload: boardID
    }
}

function receiveBoard(board){
    return {
        type: BOARD_LOADED,
        payload: board.data || []
    }
}

function invalidateBoard(error) {
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

export function incrementBoardLimit( limit ) {
    return dispatch => {
        dispatch(statusMessage(`Loading posts...`))
        dispatch({
            type: BOARD_SCROLLED_BOTTOM,
            payload: limit
        })
        return setTimeout(() => dispatch(statusMessage()), 1000)
    }
}


export function fetchBoard({ provider, boardID }) {
    console.log(`Action FetchBoard() to /api/${provider}/${boardID}`);
    return (dispatch, getState) => {
        if ( shouldFetchBoard(getState()) ){
            dispatch(statusMessage(`Requesting /${boardID}/`))
            dispatch(requestBoard(boardID))
            return Axios.get(`/api/${provider}/${boardID}`)
                .then(data => {
                    dispatch(receiveBoard(data))
                    dispatch(setBoard(boardID))
                    dispatch(clearStatus())
                })
                .catch( err => {
                    console.error(err)
                    dispatch(statusMessage(`Error: ${err}`))
                    dispatch(invalidateBoard())
                });
        }
    }
}

function shouldFetchBoard({ board }) {
    return !(board.isFetching && board.posts)
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
