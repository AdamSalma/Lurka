import { alertMessage } from './alert'
import {
    THREAD_SAVED_TO_HISTORY,
    THREAD_DESTROYED
} from '../types';


function destroyThread(threadID) {
    console.log('Destroying thread', threadID)
    return {
        type: THREAD_DESTROYED,
        payload: threadID
    }
}

export function closeThread(callback=()=>{}) {
    return (dispatch, getState) => {
        const state = getState(),
              threadID = state.status.threadID

        if (threadIsFetching(state)) {
            const err = `Closed thread '${threadID}' before it could be loaded`
            dispatch(alertMessage({
                message: err,
                type: "error",
                time: 3000
            }))
            dispatch(invalidateThread( new Error(err) ))
            return 
        }

        if (!shouldCloseThread(state)) {
            console.warn('Thread close rejected')
            callback()
            return 
        }

        const $thread = $("#thread")
        $thread.parent().nanoScroller({ stop: true })

        const onComplete = () => {
            dispatch(saveThreadToHistory(state))
            dispatch(destroyThread(threadID))
            return callback()
        }

        return $thread.velocity({top: window.innerHeight+"px"}, {
            duration: 150,
            complete: onComplete
        })
    } 
}

function threadIsFetching({ thread }) {
    return thread.isFetching
}

function shouldCloseThread({ thread }) {
    console.log(`shouldCloseThread(): isActive: ${thread.isActive}`);
    return thread.isActive
}

function saveThreadToHistory({ status, thread }) {
    return {
        type: THREAD_SAVED_TO_HISTORY,
        threadID: status.threadID,
        payload: {
            posts: thread.posts,
            receivedAt: thread.receivedAt
        }
    }
}
