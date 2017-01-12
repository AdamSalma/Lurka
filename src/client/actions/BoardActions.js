import Axios from 'axios';
import {alertMessage} from './StatusActions'
import {
    BOARD_REQUESTED, 
    BOARD_LOADED, 
    BOARD_DESTROYED,

    BOARD_INVALIDATED,

    BOARD_CHANGE,

    BOARD_SEARCHED, 
    BOARD_SCROLLED_TO_BOTTOM,

    BOARD_SAVED_TO_HISTORY,
    BOARD_LOADED_FROM_HISTORY,
} from '../constants';

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
    console.log("Setting board to " + boardID)
    return {
        type: BOARD_CHANGE,
        payload: boardID
    }
}




export function loadMorePosts( limit ) {
    return (dispatch, getState) => {
        if ( shouldLoadMorePosts(getState(), limit) ) {
            dispatch({
                type: BOARD_SCROLLED_TO_BOTTOM,
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
        const state = getState()
        if (!canRequestBoard(state)) {
            console.warn(`Board request rejected: ${provider}/${boardID}`)
            return
        }

        if ( boardInHistoryAndRecent(state, provider, boardID)) {
            dispatch(loadBoardFromHistory(state, provider, boardID))
            dispatch(setBoard(boardID))
            dispatch(alertMessage({
                message: `LOADING BOARD FROM HISTORY: /${boardID}/`,
                type: "success"
            }))
            return
        }

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

function canRequestBoard({ board, settings }) {
    const requestThrottle = settings.find(opt => opt.key === "requestThrottle").value
    const lastRequested = Date.now() - board.receivedAt

    console.log(`canRequestBoard(): ${lastRequested} > ${requestThrottle} = ${lastRequested > requestThrottle}`)
    return !board.isFetching && lastRequested > requestThrottle
}

function boardInHistoryAndRecent({boardHistory, settings}, provider, boardID) {
    const maxBoardAge = settings.find(opt => opt.key === "maxBoardAge").value * 1000  // to miliseconds
    const board = boardHistory[provider][boardID]

    if (!board){
        console.warn('Board was not in history')
    } else {
        console.warn(`DID EXIST. ${Date.now() - board.receivedAt} < ${maxBoardAge} = ${Date.now() - board.receivedAt < maxBoardAge}`)
        console.warn(board)
    }
    return board && Date.now() - board.receivedAt < maxBoardAge
}

function loadBoardFromHistory({ boardHistory }, provider, boardID) {
    const board = boardHistory[provider][boardID]
    return {
        type: BOARD_LOADED_FROM_HISTORY,
        payload: board,
        boardID,
    }
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

function saveBoardToHistory({ board, status }) {
    return {
        type: BOARD_SAVED_TO_HISTORY,
        provider: status.provider,
        boardID: status.boardID,
        payload: {
            receivedAt: board.receivedAt,
            posts: board.posts,
            watch: board.watch,
        }
    }    
}



export function searchBoard( searchWord ) {
    return dispatch => {
        dispatch({
            type: BOARD_SEARCHED,
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
