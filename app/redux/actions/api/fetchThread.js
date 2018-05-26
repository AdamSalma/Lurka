import Api from '~/api'
import * as types from '~/redux/types'

import { secondsAgo } from '~/utils/time'
import { isFunction } from '~/utils/types'

import {getCachedThread} from '~/redux/selectors'
import alerts from './alerts'


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


export default function fetchThread({ boardID, threadID, callback, noCache=false }) {
    console.log(`Action fetchThread: ${boardID} - ${threadID}`, arguments)
    return (dispatch, getState) => {
        const state = getState()

        // Try loading from cache
        if (!noCache && threadCachedAndRecent(state, threadID)) {
            dispatch(cachedThreadLoaded(state, threadID));
            dispatch(alerts.cachedThreadLoaded(threadID));
            isFunction(callback) && callback();
            return
        }

        // Apply request timeout
        if (!shouldFetchThread(state)) {
            console.warn('Thread request rejected:', boardID, threadID);
            return
        }

        // Prepare request
        dispatch(alerts.requestingThread(threadID));
        dispatch(threadRequested(threadID));

        // Perform request
        return Api.fetchThread({boardID, threadID})
            .then(({ thread, lastModified }) => {
                dispatch(threadLoaded(thread, lastModified));
                isFunction(callback) && callback();
            })
            .catch( err => {
                console.error(`Thread fetch error (${boardID}/${threadID}):`, err);

                if (err.response) {
                    dispatch(alerts.badStatusCodeAlert(err.response))
                } else if (err.request) {
                    dispatch(alerts.noResponseAlert())
                } else {
                    dispatch(alerts.internalErrorAlert())
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

export function cachedThreadLoaded(state, threadID) {
    return {
        type: types.THREAD_CACHE_LOADED,
        payload: getCachedThread(state, threadID),
        threadID,
    }
}
