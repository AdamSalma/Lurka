import * as types from 'redux/types';

export default function destroyThread () {
    return dispatch => {
        dispatch({
            type: types.THREAD_DESTROYED
        });
    }
}
