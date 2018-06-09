import * as types from '~/redux/types';
import API from '~/api';
// import { getBoardPosts } from '~/redux/selectors/board';

export default function watchBoard({ boardID, interval, cancelToken={} }) {
    console.log("Action searchBoard()");

    return function(dispatch, getState) {
        (function tryAgain() {
            setTimeout(function () {
                // Start:
                console.log("Checking for updates...")
                const current = getState().board.posts;
                API.fetchBoard(boardID).then(latest => {
                    const diff = calcDifferences(current, latest);

                    if (diff.length) {
                        console.log("Board has updated. Differnce:", diff);
                        const update = createUpdate(current, diff);
                        dispatch(boardPostsUpdate(update));
                    }

                    // Loop again
                    if (!cancelToken.cancel) tryAgain();
                }).catch( err => {
                    console.error(err);
                    tryAgain();
                });
            }, interval);
        })();
    }
}

export const boardSearched = (searchTerm) => ({
    type: types.BOARD_SEARCHED,
    payload: searchTerm
})



export function boardPostsUpdate(theUpdate) {
  return {
    type: types.BOARD_UPDATED,
    payload: theUpdate
  };
}

export function calcDifferences(current, latest) {
    return current.map(old => {
        var i;
        for (i = 0; i < latest.length; i++) {
            var post = latest[i];
            if (old.id === post.id && old.last_modified !== post.last_modified) {
                // We found an update
                var update = {
                    id: old.id,
                    type: "modified",
                    last_modified: post.last_modified,
                    replies: post.replies
                };

                return update;
            }
        }

        // No matches found! Assume archived:
        return {
            id: old.id,
            type: "archived"
        }
    });
}

export function createUpdate(current, diff) {
    return current.map( post => {
        return Object.assign({}, post, { update: diff });
    })
}
