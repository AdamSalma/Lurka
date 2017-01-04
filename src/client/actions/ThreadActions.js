import Axios from 'axios';
import {
    THREAD_REQUESTED, 
    THREAD_LOADED, 
    THREAD_DESTROYED,
    THREAD_SCROLLED_BOTTOM,
    THREAD_CHANGE, 
    THREAD_INVALIDATED
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

export function fetchThread(provider, boardID, threadID) {
    console.log(`Action FetchThread() to /api/${provider}/${boardID}/${threadID}`);
    return (dispatch, getState) => {
        if (!shouldFetchThread(getState())) return 
        dispatch(alertMessage({
            message: `Requesting thread ${threadID}`,
            type: 'info'
        }));
        dispatch(requestThread(threadID));
        return Axios.get(`/api/${provider}/${boardID}/${threadID}`)
            .then(data => {
                dispatch(receiveThread(data))
            })
            .catch( e => invalidateThread(e));
    }
}

function shouldFetchThread({ thread, settings: { requestThrottle } }) {
    const {isFetching, receivedAt} = thread
    let lastRequested = Date.now() - receivedAt

    return !isFetching && lastRequested > requestThrottle
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
