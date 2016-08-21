import {
    BOARD_REQUEST, BOARD_LOADED, BOARD_DESTROY,
    THREAD_REQUEST, THREAD_LOADED, THREAD_DESTROY
} from '../constants';
import Axios from 'axios';

// export function selectProvider(provider) {
//   return {
//     type: SELECT_PROVIDER,
//     provider
//   }
// }

/**
 * Creators
**/
function createBoard(id=1) {
    return {
        type: BOARD_REQUEST,
        id: id
    }
}

/**
 * Receivers
**/
function receiveBoard(board){
    console.log(board)
    return {
        type: BOARD_LOADED,
        payload: board.data
    }
}

function receiveThread(thread){
    console.info("Recieved thread:", thread)
    return {
        type: THREAD_LOADED,
        payload: thread.data
    }
}

/**
 * Fetchers
**/
export const fetchBoard = ({ provider, boardID }) => {
    console.log("Action FetchBoard()")
    return dispatch => {
        dispatch(createBoard())
        return Axios.get(`/${provider}/${boardID}`)
            .then(data => dispatch(receiveBoard(data)))
            // .catch( e => console.error(e))
    }
}

export const fetchThread = ({ provider, boardID, threadID }) => {
    console.log("Action FetchThread()")
    return dispatch => {
        return Axios.get(`/${provider}/${boardID}/${threadID}`)
            .then(data => dispatch(receiveThread(data)))
            // .catch( e => console.error(e))
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
