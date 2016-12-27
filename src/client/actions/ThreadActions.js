import Axios from 'axios';
import {
    THREAD_REQUESTED, 
    THREAD_LOADED, 
    THREAD_DESTROYED,
    THREAD_SCROLLED_BOTTOM,
    THREAD_CHANGE, 
    THREAD_INVALIDATED
} from '../constants';
import {statusMessage, clearStatus} from './StatusActions'

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

export function fetchThread(provider, boardID, threadID) {
    console.log(`Action FetchThread() to /api/${provider}/${boardID}/${threadID}`);
    return (dispatch, getState) => {
        if (!shouldFetchThread(getState())) return 
        dispatch(statusMessage(`Requesting thread ${threadID}`));
        dispatch(requestThread(threadID));
        return Axios.get(`/api/${provider}/${boardID}/${threadID}`)
            .then(data => {
                dispatch(receiveThread(data))
            })
            .catch( e => invalidateThread(e));
    }
}

function shouldFetchThread({ thread }) {
    const {isFetching, receivedAt, requestWhenOlderThan: ageLimit} = thread
    let age = Date.now() - receivedAt / 1000  // seconds since last time receipt 

    return !isFetching && age > ageLimit
}

export function closeThread(threadID, cb) {
    return (dispatch, getState) => {
        if ( shouldCloseThread(getState()) ) {

            $("#thread").velocity({top: window.innerHeight+"px"}, {
                duration: 100,
                complete: () => {
                    dispatch({
                        type: THREAD_DESTROYED,
                        payload: threadID
                    })

                    cb && cb()
                }
            })

        } else {
            cb && cb()
        }
    }
}

function shouldCloseThread({ thread }) {
    return thread.isActive && thread.posts.length
}
