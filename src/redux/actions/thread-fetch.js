import Axios from 'axios';

import API from '-/config/api.localhost'
import { secondsAgo } from '~/utils/time'
import { alertMessage } from './alert'
import {
    THREAD_REQUESTED,
    THREAD_LOADED,
    THREAD_DESTROYED,
    THREAD_SCROLLED_BOTTOM,
    THREAD_CHANGE,
    THREAD_INVALIDATED,
    THREAD_CACHE_LOADED,
    THREAD_CACHED
} from '../types';

function requestThread(threadID) {
    console.log("Action RequestThread wth ID:", threadID);
    return {
        type: THREAD_REQUESTED,
        payload: threadID
    }
}

function receiveThread(thread) {
    console.log("Action RecieveThread:", thread);
    return {
        type: THREAD_LOADED,
        posts: thread.data || [],
        receivedAt: Date.now()
    }
}

function invalidateThread(error) {
    console.error(error);
    return {
        type: THREAD_INVALIDATED,
        error
    }
}

function destroyThread(threadID) {
    console.log('Destroying thread', threadID)
    return {
        type: THREAD_DESTROYED,
        payload: threadID
    }
}



export function fetchThread({boardID, threadID, callback}) {
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
                callback && callback();
            })
            .catch( err => {
                handleFetchError(err, dispatch)
            });
    }
}

function handleFetchError(err, dispatch) {
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

        dispatch(invalidateThread(err.response.data || err))
    }
}

function shouldFetchThread({ thread, settings }) {
    const requestThrottle = settings.internal.requestThrottle

    console.log(`Date.now(): ${Date.now()}, receivedAt: ${thread.receivedAt}`);
    const lastRequested = secondsAgo(thread.receivedAt)

    console.log(`shouldFetchThread(): ${lastRequested} > ${requestThrottle} = ${lastRequested > requestThrottle}`)
    return !thread.isFetching && lastRequested > requestThrottle
}

function threadCachedAndRecent({cache, settings }, threadID) {
    const maxThreadAge = settings.internal.maxThreadAge
    const threadInHistory = cache.thread[threadID]

    // TODO: Remove this test code from thread/boardInHistory
    if (!threadInHistory){
        console.warn('Thread was not in history; Requesting...')
    }

    return threadInHistory && secondsAgo(thread.receivedAt) < maxThreadAge
}

function loadCachedThread({ cache }, threadID) {
    const thread = cache.thread[threadID]
    return {
        type: THREAD_CACHE_LOADED,
        payload: thread,
        threadID,
    }
}
