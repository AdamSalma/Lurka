import { alertMessage } from './alert'
import {
    THREAD_CACHED,
    THREAD_DESTROYED
} from '../types';


export const clearThread = () => {
    return (dispatch, getState) => {
        if (shouldClearThread(getState()))
            dispatch(threadCleared());
        else
            console.warn("Thread clear rejected");
    }
}

const threadCleared = () => {
    return {
        type: THREAD_DESTROYED,
        payload: threadID
    }
}

// TODO IDEA: saveThreadToHistory

function threadIsFetching({ thread }) {
    return thread.isFetching
}

function shouldCloseThread({ display }) {
    console.log(`shouldCloseThread(): display.isThreadOpen: ${display.isThreadOpen}`);
    return display.isThreadOpen
}

function saveThreadToHistory({ status, thread }) {
    return {
        type: THREAD_CACHED,
        threadID: status.threadID,
        payload: {
            posts: thread.posts,
            receivedAt: thread.receivedAt
        }
    }
}
