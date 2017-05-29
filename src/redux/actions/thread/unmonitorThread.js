import * as types from '~/redux/types';
import { alertMessage } from '../alert';
import { isThreadBeingMonitored } from '~/redux/selectors/';

export default function unmonitorThread(threadID) {
    console.log("Action unmonitorThread");

    return (dispatch, getState) => {
        if (!isThreadBeingMonitored(getState(), threadID)) {
            console.warn("Thread didn't exist in monitor list.");
            return
        }

        dispatch(alertMessage({
            'type': 'success',
            'message': 'Unmonitored thread #' + threadID,
            'duration': 8000
        }));

        dispatch(threadUnmonitor(threadID));
    }
}

// TODO: Use recieveMonitoredThred
export function recieveMonitoredThread(payload) {
    return {
        type: types.THREAD_MONITOR_UPDATED,
        payload
    }
}


export function threadUnmonitor(threadID) {
    return {
        type: types.THREAD_MONITOR_DELETED,
        payload: threadID
    }
}
