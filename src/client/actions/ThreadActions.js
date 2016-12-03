import Axios from 'axios';
import {
    THREAD_REQUESTED, 
    THREAD_LOADED, 
    THREAD_DESTROYED,
    THREAD_SCROLLED_BOTTOM,
    THREAD_CHANGE
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
        payload: thread.data || []
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
                dispatch(clearStatus())
                dispatch(receiveThread(data))
            })
            .catch( e => console.error(e));
    }
}

export function closeThread(threadID) {
    return dispatch => {
        dispatch({
            type: THREAD_DESTROYED,
            payload: threadID
        })
    }
}

function shouldFetchThread({ thread }) {
    return !(thread.isFetching && thread.posts)
}
