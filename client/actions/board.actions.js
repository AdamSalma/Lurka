import Axios from 'axios';
import {
    BOARD_REQUEST, 
    BOARD_LOADED, 
    BOARD_DESTROY
} from '../constants';

function requestBoard() {
    return {
        type: BOARD_REQUEST
    }
}

function receiveBoard(board){
    console.log(board);
    return {
        type: BOARD_LOADED,
        payload: board.data || []
    }
}

export function fetchBoard({ provider, boardID }) {
    console.log(`Action FetchBoard() to /${provider}/${boardID}`);
    return dispatch => {
        dispatch(requestBoard())
        return Axios.get(`/${provider}/${boardID}`)
            .then(data => dispatch(receiveBoard(data)))
            .catch( e => console.error(e));
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
