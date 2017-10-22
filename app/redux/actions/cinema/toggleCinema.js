import * as types from '~/redux/types';
import utils from '~/utils';
import {
    getCinemaUpdateIfChanged,
    getCinemaIsActive
} from '~/redux/selectors'

export default function toggleCinema( setToActive ) {
    console.log("Action toggleCinema()");

    return (dispatch, getState) => {
        const state = getState();

        if (!shouldToggleCinema(state, setToActive)) {
            console.warn("Cinema toggle rejected. Was already in desired state.")
            return
        }

        const shouldCloseCinema = getCinemaIsActive(state)

        if (shouldCloseCinema) {
            dispatch(cinemaClosed())
        } else {
            const update = getCinemaUpdateIfChanged(state)
            if (update) {
                dispatch(cinemaUpdated(update))
            }
            dispatch(cinemaOpened())
        }
    }
}

export const shouldToggleCinema = (state, override) => {
    const currentState = getCinemaIsActive(state);

    if (utils.types.isDefined(override)) {
        if (override === currentState) {
            return false
        }
    }

    return true
}

export const cinemaOpened = () => ({ type: types.CINEMA_OPENED })
export const cinemaClosed = () => ({ type: types.CINEMA_CLOSED })
export const cinemaUpdated = (update) => ({
    type: types.CINEMA_TIMELINE_UPDATED,
    payload: update
})
