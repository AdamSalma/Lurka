import * as types from '~/redux/types';
import { alertMessage } from '../alert';
import Axios from 'axios';
import {normaliseApiError} from '~/utils/redux';

export default function updateWatchEntity ({ id, url, lastModified }, callback) {
    console.log("Action updateWatchEntity", arguments);
    const config = {
        headers: { "If-Modified-Since": lastModified },
        validateStatus: (status) => {
            return status === 200 || status === 304
        }
    }

    return (dispatch, getState) => {

        dispatch(watchEntityRequested({ id }));

        return Axios.get(url, config)
            .then(res => {
                if (res.status === 200) {
                    const _lastModified = res.headers['last-modified'];

                    dispatch(watchEntityUpdated({
                        id, lastModified: _lastModified, content: res.data
                    }));

                    callback({ id, didUpdate: true, error: false })

                    return;
                }

                console.warn(`updateWatchEntity: Update returned status code: ${res.status}. Response:`, res);

                callback({ id, didUpdate: false, error: false })
            })
            .catch( err => {
                const error = normaliseApiError(err);
                console.error(`updateWatchEntity:`, error);

                callback({ id, didUpdate: false, error })

                dispatch(watchEntityInvalidated({ id, error }));

                dispatch(alertMessage({
                    message: error,
                    type: "error",
                    time: 20000
                }));

            });
    }
}


export function watchEntityRequested(payload) {
    return {
        type: types.WATCH_ENTITY_REQUESTED,
        payload: payload
    }
}

export function watchEntityInvalidated(err) {
    return {
        type: types.WATCH_ENTITY_INVALIDATED,
        payload: payload
    }
}

export function watchEntityUpdated(payload) {
    return {
        type: types.WATCH_ENTITY_UPDATED,
        payload: payload
    }
}
