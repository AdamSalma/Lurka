import * as types from '~/redux/types'
import Axios from 'axios';

import API from '-/config/api.localhost'
import { secondsAgo } from '~/utils/time'
import { isFunction } from '~/utils/types'
import { alertMessage } from '../alert'

export function requestThread(threadID) {
    console.log("Action RequestThread wth ID:", threadID);
    return {
        type: types.THREAD_REQUESTED,
        payload: threadID
    }
}

export function receiveThread(thread) {
    console.log("Action RecieveThread:", thread);
    return {
        type: types.THREAD_LOADED,
        posts: thread.data || [],
        receivedAt: Date.now()
    }
}

export function invalidateThread(error) {
    console.error(error);
    return {
        type: types.THREAD_INVALIDATED,
        error
    }
}


export default function fetchThread({boardID, threadID, callback}) {
    const url = API.thread(boardID, threadID)

    return (dispatch, getState) => {
        const state = getState()

        if (!shouldFetchThread(state)) {
            console.warn('Thread request rejected:', url)
            return
        }

        if (threadCachedAndRecent(state, threadID)) {
            dispatch(loadCachedThread(state, threadID))
            dispatch(alertMessage({
                message: `Loading thread ${threadID} from history`,
                type: "success"
            }))
            return
        }

        dispatch(requestThread(threadID));
        dispatch(alertMessage({
            message: `Requesting thread ${threadID}`,
            type: 'info'
        }));

        return Axios.get(url)
            .then( data => {
                dispatch(receiveThread(data));
                isFunction(callback) && callback();
            })
            .catch( err => handleFetchError(err, dispatch));
    }
}

export function handleFetchError(err, dispatch) {
    err = err.response && err.response.data || err;
    console.error(err);
    if (err.status === 404) {
        dispatch(alertMessage({
            messagge: "Thread 404'd",
            type: "error",
        }))
    } else {
        dispatch(alertMessage({
            message: err,
            type: "error",
            time: 20000
        }))
    }

    dispatch(invalidateThread(err))
}

export function shouldFetchThread({ thread, settings }) {
    const requestThrottle = settings.internal.requestThrottle

    console.log(`Date.now(): ${Date.now()}, receivedAt: ${thread.receivedAt}`);
    const lastRequested = secondsAgo(thread.receivedAt)

    console.log(`shouldFetchThread(): ${lastRequested} > ${requestThrottle} = ${lastRequested > requestThrottle}`)
    return !thread.isFetching && lastRequested > requestThrottle
}

export function threadCachedAndRecent({cache, settings }, threadID) {
    const maxThreadAge = settings.internal.maxThreadAge
    const threadInHistory = cache.thread[threadID]

    // TODO: Remove this test code from thread/boardInHistory
    if (!threadInHistory) {
        console.warn('Thread was not in history; Requesting...')
    }

    return threadInHistory && secondsAgo(thread.receivedAt) < maxThreadAge
}

export function loadCachedThread({ cache }, threadID) {
    const thread = cache.thread[threadID]
    return {
        type: types.THREAD_CACHE_LOADED,
        payload: thread,
        threadID,
    }
}
