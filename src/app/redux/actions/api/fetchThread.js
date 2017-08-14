import * as types from '~/redux/types'
import Axios from 'axios';

import Api from 'config/api.4chan'
import { secondsAgo } from '~/utils/time'
import { isFunction } from '~/utils/types'
import { normaliseApiError } from '~/utils/redux'
import { alertMessage } from '../alert'

import {getCachedThread} from '~/redux/selectors'
import {parseThread} from '~/parsers'


export function threadRequested(threadID) {
    console.log("Action RequestThread wth ID:", threadID);
    return {
        type: types.THREAD_REQUESTED,
        payload: threadID
    }
}

export function threadLoaded(thread, lastModified) {
    console.log("Action RecieveThread:", thread);
    return {
        type: types.THREAD_LOADED,
        payload: {
            lastModified,
            posts: thread,
            receivedAt: Date.now()
        }
    }
}

export function threadInvalidated(error) {
    console.error(error);
    return {
        type: types.THREAD_INVALIDATED,
        error
    }
}


export default function fetchThread({ boardID, threadID, callback }) {
    const url = Api.thread(boardID, threadID)

    return (dispatch, getState) => {
        const state = getState()

        // Try loading from cache
        if (threadCachedAndRecent(state, threadID)) {
            dispatch(threadCacheLoaded(state, threadID));
            dispatch(alertMessage({
                message: `Loading thread ${threadID} from history`,
                type: "success"
            }));
            isFunction(callback) && callback();
            return
        }

        // Apply request timeout
        if (!shouldFetchThread(state)) {
            console.warn('Thread request rejected:', url);
            return
        }

        // Prepare request
        dispatch(threadRequested(threadID));
        dispatch(alertMessage({
            message: `Requesting thread ${threadID}`,
            type: 'info'
        }));

        // Perform request
        return Axios.get(url)
            .then(res => {
                const data = res.data.posts;
                const lastModified = res.headers["last-modified"] || 0
                const thread = parseThread(data, boardID);

                dispatch(threadLoaded(thread, lastModified));

                isFunction(callback) && callback();
            })
            .catch( err => {
                const error = normaliseApiError(err);

                if (err.status === 404) {
                    dispatch(alertMessage({
                        messagge: "Thread 404'd",
                        type: "error",
                    }));
                } else {
                    dispatch(alertMessage({
                        message: err,
                        type: "error",
                        time: 20000
                    }));
                }

                dispatch(threadInvalidated(err));
            });
    }
}

export function shouldFetchThread({ thread, settings }) {
    const requestThrottle = settings.internal.requestThrottle

    console.log(`Date.now(): ${Date.now()}, receivedAt: ${thread.receivedAt}`);
    const sinceReceived = secondsAgo(thread.receivedAt)

    console.log(`shouldFetchThread(): ${sinceReceived} > ${requestThrottle} = ${sinceReceived > requestThrottle}`)
    return !thread.isFetching && sinceReceived > requestThrottle
}

export function threadCachedAndRecent(state, threadID) {
    const maxThreadAge = state.settings.internal.maxThreadAge
    const cachedThread = getCachedThread(state, threadID)

    // TODO: Remove this test code from thread/boardInHistory
    if (!cachedThread) {
        console.warn('Thread was not in history; Requesting...')
    }

    return cachedThread && secondsAgo(cachedThread.receivedAt) < maxThreadAge
}

export function threadCacheLoaded(state, threadID) {
    return {
        type: types.THREAD_CACHE_LOADED,
        payload: getCachedThread(state, threadID),
        threadID,
    }
}
