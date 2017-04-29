import {
    USER_NAVIGATED
} from '../types'

const {
    contentViewID,
    headerHeight
} = window.appSettings

const contentID = '#' + contentViewID

export const navigateToView = (destination, callback=()=>{}) => {
    switch (destination) {
        case 'home':
            return toggleHomeView(false, callback)
        case 'content':
            return toggleHomeView(true, callback)
        case 'settings':
            // TODO: write this action
            return gotoSettings(callback)
        default:
            throw new Error(`Invalid navigation destination '${destination}'`)
    }
}

export const toggleHomeView = (override, callback=()=>{}) => {
    let top;
    const easing_in = [0.23, 1, 0.32, 1]
    const easing_out = [0.23, 1, 0.32, 1]
    const duration = 600

    return (dispatch, getState) => {
        if (typeof override !== "undefined") {
            top = override
                ? window.innerHeight - headerHeight + 2 + "px"
                : 0
        } else {
            top = getState().display.activeView !== "home"
                ? window.innerHeight - headerHeight + 2 + "px"
                : 0
        }

        // 2px +- used to cover border
        const navigatedTo = top === 0 ? 'content' : 'home'
        const easing = top === 0 ? easing_out : easing_in

        return $(contentID).velocity({top}, {
            duration, easing,
            complete: () => {
                dispatch(userNavigated(navigatedTo))
                callback(navigatedTo)
            }
        })
    }
}

const userNavigated = (navigatedTo) => {
    return {
        type: USER_NAVIGATED,
        payload: navigatedTo
    }
}
