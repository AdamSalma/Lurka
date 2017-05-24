import * as types from '~/redux/types'
import {getThreadPosts, getThreadReceivedAt} from '~/redux/selectors/thread'
import {getThreadID, getBoardID} from '~/redux/selectors/status'

export const cacheCurrentThread = function () {
    return function(dispatch, getState) {
        const state = getState();

        const threadID = getThreadID(state);
        const threadPosts = getThreadPosts(state);
        const threadReceivedAt = getThreadReceivedAt(state);

        if (threadPosts && threadPosts.length) {
            dispatch(cacheThread(threadID, threadPosts, receivedAt));
        }

        else {
            console.error(`Could not cache invalid thread. Was: '${threadPosts}'`)
        }
    }
}


export const cacheThread = function (threadID, threadPosts, receivedAt) {
    return {
        type: types.THREAD_CACHED,
        threadID: threadID,
        payload: {
            posts: threadPosts,
            receivedAt: receivedAt,
            cachedAt: Date.now()
        }
    }
}
