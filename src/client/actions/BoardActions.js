import Axios from 'axios';
import {
    BOARD_REQUEST, 
    BOARD_LOADED, 
    BOARD_DESTROY,
    BOARD_LIST_REQUEST,
    BOARD_LIST_LOADED,
    BOARD_CHANGE
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

function requestBoardList() {
    return {
        type: BOARD_LIST_REQUEST
    }
}

function receiveBoardList(boardList){
    console.log(boardList);
    return {
        type: BOARD_LIST_LOADED,
        payload: boardList.data || []
    }
}

function setBoard( boardID ) {
    console.log("Changing board to " + boardID)
    return {
        type: BOARD_CHANGE,
        payload: boardID
    }
}

export function fetchBoard({ provider, boardID }) {
    console.log(`Action FetchBoard() to /provider/${provider}/${boardID}`);
    return dispatch => {
        dispatch(requestBoard())
        return Axios.get(`/provider/${provider}/${boardID}`)
            .then(data => {
                dispatch(receiveBoard(data))
                dispatch(setBoard(boardID))
            })
            .catch( e => console.error(e));
    }
}

export function fetchBoardList({ provider }) {
    console.log(`Action FetchBoard() to /provider/${provider}/boards`);
    return dispatch => {
        dispatch(requestBoardList())
        return Axios.get(`/provider/${provider}/boards`)
            .then(data => dispatch(receiveBoardList(data)))
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
