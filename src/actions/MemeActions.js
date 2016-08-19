import {
    TEST, BOARD_CREATE
} from '../constants';

// export function selectProvider(provider) {
//   return {
//     type: SELECT_PROVIDER,
//     provider
//   }
// }
export const testAction = (testee) => {
    console.log("Test action")
    return {
        type: TEST,
        payload: testee || "hello darkness my old friend"
    }
}

// export function requestBoard(boardID) {
//     return dispatch => {
//         console.log("Requested board using Action")
//         return {
//             type: REQUEST_BOARD,
//             board: "board_url_here"
//         }
//     }
// }

//
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
