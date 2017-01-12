import Axios from 'axios';
import {
    THREAD_REQUESTED, 
    THREAD_LOADED, 
    THREAD_DESTROYED,
    THREAD_SCROLLED_BOTTOM,
    THREAD_CHANGE, 
    THREAD_INVALIDATED,
    THREAD_LOADED_FROM_HISTORY,
    THREAD_SAVED_TO_HISTORY
} from '../constants';
import { alertMessage } from './StatusActions'

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
        type: THREAD_INVALIDATED
    }
}

function destroyThread(threadID) {
    console.log('Destroying thread', threadID)
    return {
        type: THREAD_DESTROYED,
        payload: threadID
    }
}

export function fetchThread(provider, boardID, threadID) {
    return (dispatch, getState) => {
        const state = getState()

        if (!shouldFetchThread(state)) {
            console.warn(`Thread request rejected: ${provider}/${boardID}/${threadID}`)
            return 
        }

        if (threadInHistoryAndRecent(state, provider, threadID)) {
            dispatch(loadThreadFromHistory(state, provider, threadID))
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

        return Axios.get(`/api/${provider}/${boardID}/${threadID}`)
            .then(data => {
                dispatch(receiveThread(data))
            })
            .catch( e => invalidateThread(e));
    }
}

function shouldFetchThread({ thread, settings }) {
    const requestThrottle = settings.find(opt => opt.key === "requestThrottle").value
    const lastRequested = Date.now() - thread.receivedAt

    console.log(`shouldFetchThread(): ${lastRequested} > ${requestThrottle} = ${lastRequested > requestThrottle}`)
    return !thread.isFetching && lastRequested > requestThrottle
}

function threadInHistoryAndRecent({threadHistory, settings }, provider, threadID) {
    const maxThreadAge = settings.find(opt => opt.key === "maxThreadAge").value * 1000  // to miliseconds
    const thread = threadHistory[provider][threadID]

    // TODO: Remove this test code from thread/boardInHistory
    if (!thread){
        console.warn('Thread was not in history')
    } else {
        console.warn(`THREAD DID EXIST. ${Date.now() - thread.receivedAt} < ${maxThreadAge} = ${Date.now() - thread.receivedAt < maxThreadAge}`)
        console.warn(thread)
    }
    return thread && Date.now() - thread.receivedAt < maxThreadAge
}

function loadThreadFromHistory({ threadHistory }, provider, threadID) {
    const thread = threadHistory[provider][threadID]
    return {
        type: THREAD_LOADED_FROM_HISTORY,
        payload: thread,
        provider,
        threadID,
    }
}



export function closeThread(threadID, cb=() => {}) {
    return (dispatch, getState) => {
        const state = getState()

        if (threadIsFetching(state)) {
            dispatch(invalidateThread(
                new Error(`Thread ${threadID} closed while fetching`)
            ))
            return 
        }

        if (!shouldCloseThread(state)) {
            console.warn('Thread close rejected')
            cb()
            return 
        }

        
        return $("#thread").velocity({top: window.innerHeight+"px"}, {
            duration: 150,
            complete: () => {
                dispatch(saveThreadToHistory(state))
                dispatch(destroyThread(threadID))
                cb()
            }
        })
    } 
}

function threadIsFetching({ thread }) {
    return thread.isFetching
}

function shouldCloseThread({ thread }) {
    return thread.isActive && thread.posts.length
}

function saveThreadToHistory({ status, thread }){
    return {
        type: THREAD_SAVED_TO_HISTORY,
        provider: status.provider,
        threadID: status.threadID,
        payload: {
            posts: thread.posts,
            receivedAt: thread.receivedAt
        }
    }
}

