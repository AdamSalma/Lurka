import * as types from '~/redux/types';
import utils from '~/utils';
import {
    getPostIsOpen,
    getPostPosition
} from '~/redux/selectors'

export default function togglePostView({context, override}) {
    console.log("Action togglePost()");

    switch (context) {
        case: "thread":
            break;
        case: "board"
            break;
        default:
            throw new Error(`invalid togglePost context: (${context}). Expected 'board' or 'thread'`)
    }

    return (dispatch, getState) => {
        const state = getState();

        if (!shouldTogglePostView(state, override)) {
            console.warn("Post toggle rejected. Was already in desired state.")
            return
        }

        const shouldClosePost = getPostIsOpen(state)

        if (shouldClosePost) {
            dispatch(postClosed(context))
        } else {
            dispatch(postOpened(context, getPostPosition()))
        }
    }
}

export const shouldTogglePostView = (state, override) => {
    const currentState = getPostIsActive(state);

    if (utils.types.isDefined(override)) {
        if (override === currentState) {
            return false
        }
    }

    return true
}

export const postOpened = (context, position) => ({
    type: types.POST_OPENED,
    payload: { context, position }
})

export const postClosed = (context) => ({
    type: types.POST_CLOSED,
    payload: { context }
})
