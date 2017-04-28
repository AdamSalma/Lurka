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
        console.warn("changing to", navigatedTo);
        console.warn("top", top);
        console.warn("element is", $(contentID));


        return $(contentID).velocity({top}, {
            duration: 400,
            easing: 'ease-out',
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
