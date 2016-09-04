import Axios from 'axios';
import {
    THREAD_REQUEST, 
    THREAD_LOADED, 
    THREAD_DESTROY,
    THREAD_POST_LOAD
} from '../constants';


function requestThread(threadID) {
	console.log("Action RequestThread wth ID:", threadID);
    return {
        type: THREAD_REQUEST,
        threadID
    }
}

function receiveThread(thread){
    console.log("Action RecieveThread:", thread);
    return {
        type: THREAD_LOADED,
        payload: thread.data
    }
}

export function fetchThread(threadID, provider="4chan", boardID="g") {
    console.log(`Action FetchThread() to /${provider}/${boardID}/${threadID}`);
    return dispatch => {
        dispatch(requestThread(threadID));
        return Axios.get(`/${provider}/${boardID}/${threadID}`)
            .then(data => dispatch(receiveThread(data)))
            .catch( e => console.error(e));
    }
}

export function loadThread() {
	console.log('Loaded thread');
	return {
		type: THREAD_POST_LOAD
	}
}