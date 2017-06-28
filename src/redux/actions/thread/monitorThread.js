import * as types from '~/redux/types';
import { alertMessage } from '../alert';

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
            'message': `Monitoring current thread (#${threadID})`,
            'duration': 8000
        }))

        dispatch(watchThread(thread))
    }
}


export function watchThread(thread) {
    return {
        type: types.THREAD_MONITOR_ADDED,
        payload: thread
    }
}
