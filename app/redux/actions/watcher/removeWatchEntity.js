import * as types from '~/redux/types';
import { alertMessage } from '../alert';

const {alerts} = Lurka;

export default function removeWatchEntity({ id }) {
    console.log("Action removeWatchEntity");

    return (dispatch, getState) => {
        const state = getState();

        if (!isRegistered(id, state)) {
            const message = alerts.watchEntityAlreadyRemoved(id);

            console.error(message);
            dispatch(alertMessage(message));

            return
        }

        dispatch(createRemoveWatchEntity({ id }))
    }
}

export function isRegistered(id, state) {
    // TODO: replace this with a selector
    return state.watcher.entities.queue.find( entity => entity.id === id );
}


export function createRemoveWatchEntity(payload) {
    return {
        type: types.WATCH_ENTITY_REMOVED,
        payload: payload
    }
}
