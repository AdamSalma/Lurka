import Velocity from 'velocity-animate'
import {
	PAGE_SCROLL_STARTED,
	PAGE_SCROLL_ENDED,
    HEADER_TOGGLED
} from '../constants'

const scrollTargets = ["board", "thread", "settings"]  // "home" is immovable

export function scrollPage({ page, direction, callback, to="home", duration=1000, easing='ease-in-out' }) {

    if ( !scrollTargets.includes(page) ) 
        throw new Error(`Invalid page supplied to scrollPage: ${page}; ${scrollTargets}`);

    const top = direction === "up" ? 0 : window.innerHeight   
    const $target = getTarget(page)

    return (dispatch, getState) => {
        if (shouldntScroll(getState(), page, direction)) 
            return

        if (direction !== "up") {
            // Fix scroll toggle. Change state when reverting
            page = to
        }

        $target.velocity("stop");
        dispatch(startScroll());

        return $target.velocity({top}, {
            duration, easing,
            complete: () => {
                dispatch(endScroll(page))
                if (callback) callback();
            }
        });
    }
}

function shouldntScroll({status}, target, direction) {
    return status.currentPage === target && direction === "up"
}

function getTarget(endpoint) {
    const target = $('.page-'+endpoint) // will always be 1
    if (!target) {
        throw new Error(`No .page-${endpoint} found`);
    } else {
        return target
    }
}

function startScroll() {
    return {
        type: PAGE_SCROLL_STARTED,
    }
}

function endScroll(currentPage) {
    return {
        type: PAGE_SCROLL_ENDED,
        payload: currentPage
    }
}

// TODO: Destructure scrollHeader args
export function scrollHeader(toVisible, delay) {
    const $header = $('#header'), duration=300;
    var 
        delay = delay||0, 
        easing='ease-in', 
        top=`-${$header.height()}px`;

    if (toVisible) {
        top = 0
        easing = 'ease-out'
    }


    return (dispatch, getState) => {
        if (shouldScrollHeader(getState(), toVisible)){

            $header.velocity("stop");
            dispatch(headerToggle(toVisible))

            return $header.velocity(
                {top}, {duration, easing, delay}
            )
        }
    }
}

function headerToggle(toVisible) {
    console.log("Action headerToggle: " + toVisible)
    return {
        type: HEADER_TOGGLED,
        toVisible
    }
}

function shouldScrollHeader({status:{ isHeaderVisible, currentPage }}, toVisible) {    
    return isHeaderVisible !== toVisible && currentPage !== "home"
}

