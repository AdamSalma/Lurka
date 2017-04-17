import {
    PROVIDER_CHANGE
} from '../types';

export function changeProvider( provider ) {
    return (dispatch, getState) => {
        if (shouldChangeProvider(getState(), provider)) {
            console.info("Action changeProvider() to " + provider);
            dispatch({
                type: PROVIDER_CHANGE,
                payload: provider
            })
        }
    }
}

function shouldChangeProvider( {status}, provider) {
    return status.provider !== provider
}
