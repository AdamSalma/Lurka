import * as types from '~/redux/types';
import { getMutableBoardPosts, getBoardSortBy, getRawBoardPosts } from '~/redux/selectors/board';

export default function sortBoard (sortBy) {
    return (dispatch, getState) => {
        const state = getState();

        if (getBoardSortBy(state) == sortBy) {
            console.warn(`Could not sort. Is already sorted using '${sortBy}'`);
            return;
        }

        const posts = getSortAlgorithm(sortBy)(state);

        dispatch(boardSorted({
            sortBy, posts
        }));
    }
}

export function getSortAlgorithm (sortBy) {
    switch (sortBy) {
        case "bumporder":
            return bumpSortAlgorithm;
        case "lastreply":
            return latestReplySortAlgorithm;
        case "creationdate":
            return creationDateSortAlgorithm;
        case "replycount":
            return replyCountSortAlgorithm;

        default:
            throw new Error(`No sort algorithm for ${sortBy} was found`);
    }
}

export function bumpSortAlgorithm (state) {
    return getRawBoardPosts(state);
}

export function latestReplySortAlgorithm (state) {
    //var posts = getMutableBoardPosts(state).slice(0);  // clone

    return getMutableBoardPosts(state).sort((a, b) => {
        if (a.last_modified < b.last_modified)
            return 1;
        if (a.last_modified > b.last_modified)
            return -1;
        return 0;
    });
}

export function creationDateSortAlgorithm (state) {
    return getMutableBoardPosts(state).sort((a, b) => {
        if (a.time < b.time)
            return 1;
        if (a.time > b.time)
            return -1;
        return 0;
    });
}

export function replyCountSortAlgorithm (state) {
    return getMutableBoardPosts(state).sort((a, b) => {
        if (a.replies.textCount < b.replies.textCount)
            return 1;
        if (a.replies.textCount > b.replies.textCount)
            return -1;
        return 0;
    });
}

export const boardSorted = (payload) => ({
    type: types.BOARD_SORTED,
    payload: payload
})
