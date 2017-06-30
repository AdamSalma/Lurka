import * as types from '~/redux/types';
import API from '-/config/api.localhost';
import { alertMessage } from '../alert';

export default function updateMonitoredThread(thread) {
    console.log("Action updateMonitoredThread();");

    const url = API.thread(thread) + "?receivedAt=" + thread.receivedAt

    return (dispatch, getState) => {
        // TODO: Is thread being monitored? Reject if not.

        return Axios.get(url)
            .then(res => {
                if (res.status === 304){
                    console.warn('Monitored thread returned status code 304!');
                } else {
                    console.warn("Monitore thread status code wasn't 304:", res.status);
                }

                dispatch(alertMessage({
                    'type': 'success',
                    'message': res.status,
                    'duration': 8000
                }));
            })
            .catch( err => {
                dispatch(alertMessage({
                    message: err.response.data,
                    type: "error",
                    time: 20000
                }));
                // dispatch(invalidate(err.response.data))
            });
    }
}
