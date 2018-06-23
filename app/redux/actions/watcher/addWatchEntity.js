import * as types from '~/redux/types';
import { alertMessage } from '../alert';


export default function addWatchEntity({id, url, lastModified, op, postsCount, lastReplyAt}) {
    console.log("Action addWatchEntity");

    return (dispatch, getState) => {
        const state = getState();

        // Dont watch if duplicate
        if (isBeingWatched(id, state)) {
            const message = `Already watching '${id}'`

            console.error(message);
            dispatch(alertMessage({
                'type': 'info',
                'message': message,
                'duration': 5000
            }));

            return
        }

        // Watch the entity
        const message = `Watching '${id}'`
        console.info(message);
        dispatch(alertMessage({
            'type': 'success',
            'message': message,
            'duration': 8000
        }))

        dispatch(createAddWatchEntity({
            id, url, lastModified, op, postsCount, lastReplyAt
        }))
    }
}

// TODO: replace this with a selector
export function isBeingWatched(id, state) {
    return state.watcher.entities.queue.find( entity => entity.id === id );
}


export function createAddWatchEntity(payload) {
    return {
        type: types.WATCH_ENTITY_ADDED,
        payload: payload
    }
}
