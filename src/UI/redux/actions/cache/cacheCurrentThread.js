import * as types from '~/redux/types'
import {
    getThreadID,
    getThreadPosts,
    getThreadReceivedAt
} from '~/redux/selectors'

export default function cacheCurrentThread () {
    return function(dispatch, getState) {
        const state = getState();

        const threadID = getThreadID(state);
        const threadPosts = getThreadPosts(state);
        const threadReceivedAt = getThreadReceivedAt(state);

        if (threadPosts && threadPosts.length) {
            dispatch(threadCached(threadID, threadPosts, threadReceivedAt));
        }

        else {
            console.error(`Could not cache invalid thread. Was: ${threadPosts}`);
        }
    }
}


export function threadCached (threadID, threadPosts, threadReceivedAt) {
    return {
        type: types.THREAD_CACHED,
        threadID: threadID,
        payload: {
            posts: threadPosts,
            receivedAt: threadReceivedAt
        }
    }
}
