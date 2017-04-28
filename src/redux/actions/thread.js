import { alertMessage } from './alert'
import {
    THREAD_CACHE_SAVED,
    THREAD_DESTROYED
} from '../types';


function destroyThread(threadID) {
    console.log('Destroying thread', threadID)
    return {
        type: THREAD_DESTROYED,
        payload: threadID
    }
}

export function closeThread(cb=()=>{}) {
    return (dispatch, getState) => {
        const state = getState(),
              threadID = state.status.threadID

        console.log("Initial callback:", cb)
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
            cb()
            return
        }

        const $thread = $("#thread")
        console.log("#thread:", $thread)
        $thread.parent().nanoScroller({ stop: true })

        console.log("callback before velocity:", cb)

        return $thread.velocity({top: window.innerHeight+"px"}, {
            duration: 150,
            complete: () => {
                dispatch(saveThreadToHistory(state))
                dispatch(destroyThread(threadID))
                console.log("threadClose callback:", cb)
                return cb()
            }
        })
    }
}

function threadIsFetching({ thread }) {
    return thread.isFetching
}

function shouldCloseThread({ display }) {
    console.log(`shouldCloseThread(): display.isThreadOpen: ${display.isThreadOpen}`);
    return display.isThreadOpen
}

function saveThreadToHistory({ status, thread }) {
    return {
        type: THREAD_CACHE_SAVED,
        threadID: status.threadID,
        payload: {
            posts: thread.posts,
            receivedAt: thread.receivedAt
        }
    }
}
