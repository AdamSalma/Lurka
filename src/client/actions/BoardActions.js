import Axios from 'axios';
import {
    BOARD_REQUESTED, 
    BOARD_LOADED, 
    BOARD_DESTROYED,
    BOARD_LIST_REQUESTED,
    BOARD_LIST_LOADED,
    BOARD_CHANGED,
    BOARD_SCROLLED_BOTTOM
} from '../constants';

function requestBoard(boardID) {
    return {
        type: BOARD_REQUESTED,
        payload: boardID
    }
}

function receiveBoard(board){
    console.log(board);
    return {
        type: BOARD_LOADED,
        payload: board.data || []
    }
}

function requestBoardList(provider) {
    return {
        payload: provider,
        type: BOARD_LIST_REQUESTED
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
        type: BOARD_CHANGED,
        payload: boardID
    }
}

export function incrementBoardLimit( limit ) {
    return dispatch => {
        dispatch({
            type: BOARD_SCROLLED_BOTTOM,
            payload: limit
        })
    }
}


export function fetchBoard({ provider, boardID }) {
    console.log(`Action FetchBoard() to /provider/${provider}/${boardID}`);
    return (dispatch, getState) => {
        if (shouldFetchBoard(getState())){
            dispatch(requestBoard(boardID))
            return Axios.get(`/provider/${provider}/${boardID}`)
                .then(data => {
                    dispatch(receiveBoard(data))
                    dispatch(setBoard(boardID))
                })
                .catch( e => console.error(e));
        }
    }
}

function shouldFetchBoard({ content }) {
    return !(content.isFetching && content.board.posts)
}

export function fetchBoardList({ provider }) {
    console.log(`Action FetchBoard() to /provider/${provider}/boards`);
    return (dispatch, getState) => {
        const { boardlist } = getState().content
        if (!boardlist.hasOwnProperty(provider)) {
            dispatch(requestBoardList(provider))
            return Axios.get(`/provider/${provider}/boards`)
                .then(data => dispatch(receiveBoardList(data)))
                .catch( e => console.error(e));
        }
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
