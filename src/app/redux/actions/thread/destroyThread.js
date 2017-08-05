import * as types from '~/redux/types';

export default function destroyThread () {
    return dispatch => {
        dispatch(threadDestroyed());
    }
}

export function threadDestroyed () {
    return {
        type: types.THREAD_DESTROYED
    }
}

