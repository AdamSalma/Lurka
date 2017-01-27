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
    const url = `/api/${provider}/board/${boardID}/thread/${threadID}`
    return (dispatch, getState) => {
        const state = getState()

        if (!shouldFetchThread(state)) {
            console.warn('Thread request rejected:', url)
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

        return Axios.get(url)
            .then( data => {
                dispatch(receiveThread(data))
            })
            .catch( err => {
                dispatch(alertMessage({
                    message: err.message,
                    type: "error",
                    time: 20000
                }))
                invalidateThread(err)
            });
    }
}

function shouldFetchThread({ thread, settings }) {
    const requestThrottle = settings["requestThrottle"].value
    const lastRequested = Date.now() - thread.receivedAt

    console.log(`shouldFetchThread(): ${lastRequested} > ${requestThrottle} = ${lastRequested > requestThrottle}`)
    return !thread.isFetching && lastRequested > requestThrottle
}

function threadInHistoryAndRecent({threadHistory, settings }, provider, threadID) {
    const maxThreadAge = settings["maxThreadAge"].value * 1000  // to miliseconds
    const thread = threadHistory[provider][threadID]

    // TODO: Remove this test code from thread/boardInHistory
    if (!thread){
        console.warn('Thread was not in history; Requesting...')
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
            const err = `Thread '${threadID}' closed while fetching`
            dispatch(alertMessage({
                message: err,
                type: "error",
                time: 20000
            }))
            dispatch(invalidateThread( new Error(err) ))
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

