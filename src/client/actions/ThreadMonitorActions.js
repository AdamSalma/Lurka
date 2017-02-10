import Axios from 'axios';

import API from '~/api'
import { alertMessage } from './StatusActions';

import {
    THREAD_MONITOR_ADDED,
    THREAD_MONITOR_DELETED,
    THREAD_MONITOR_UPDATED
} from '~/constants';


function recieveThread(payload) {
    return {
        type: THREAD_MONITOR_UPDATED,
        payload
    }
}

function threadMonitor(payload) {
    return {
        type: THREAD_MONITOR_ADDED,
        payload
    }
}

function threadUnmonitor(payload) {
    return {
        type: THREAD_MONITOR_DELETED,
        payload
    }
}


export function monitorThread(thread, boardID) {
    console.log("Action monitorThread");
    const { threadID } = thread

    return (dispatch, getState) => {
        if (threadBeingMonitored(threadID, getState())) {
            dispatch(alertMessage({
                'type': 'info',
                'message': `Thread #${threadID} is already being watched`,
                'duration': 8000
            }))
            return 
        }

        dispatch(alertMessage({
            'type': 'success',
            'message': 'Monitoring thread #' + threadID,
            'duration': 8000
        }))

        dispatch(threadMonitor(thread))        
    }
}






export function unmonitorThread(threadID) {
    console.log("Action unmonitorThread");

    return (dispatch, getState) => {
        if (!threadBeingMonitored(threadID, getState())) {
            console.warn("unmonitorThread rejected");
            return 
        }

        dispatch(alertMessage({
            'type': 'success',
            'message': 'Unmonitored thread #' + threadID,
            'duration': 8000
        }))

        dispatch(threadUnmonitor(threadID))        
    }
}

function threadBeingMonitored(_threadID, {threadMonitor}) {
    return !!threadMonitor.threads.find(({threadID}) => threadID === _threadID)
}






export function updateMonitoredThread(thread) {
    console.log("Action updateMonitoredThread");

    const url = API.thread(thread) + "?requestedAt=" + thread.requestedAt

    return (dispatch, getState) => {
        return Axios.get(url)
            .then(res => {
                if (res.status === 304){
                    console.warn('WAS 304 YASSSSSSSSSSSS')
                } else {
                    console.warn("Wasn't 304", res.status)
                }
                dispatch(alertMessage({
                    'type': 'success',
                    'message': res.status,
                    'duration': 8000
                }))
            })
            .catch( err => {
                dispatch(alertMessage({
                    message: err.response.data,
                    type: "error",
                    time: 20000
                }))
                // dispatch(invalidate(err.response.data))
            });
    }
}

function threadHasNewPosts(res) {
    return threadMonitor.threads
}
