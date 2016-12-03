import Velocity from 'velocity-animate'
import {
	PAGE_SCROLL_STARTED,
	PAGE_SCROLL_ENDED
} from '../constants'

const scrollEndpoints = ["content", "settings"]  // "home" is immovable
const scrollDuration = 1000
const scrollEasing = "ease-in-out"

export function scrollPage(endpoint, up) {

    if ( !scrollEndpoints.includes(endpoint) ) 
        throw new Error("Invalid scroll endpoint supplied to action");
    console.log("scrollPage");
    const offset = up ? 0 : window.innerHeight   

    return (dispatch, getState) => {
        console.log("shouldscroll?");
        if (up && !shouldScroll(getState(), endpoint)) return;
        console.log("yes");
        dispatch(startScroll(endpoint));
        return getTarget(endpoint).velocity({
            top: offset
        }, {
            duration: scrollDuration, 
            easing: scrollEasing, 
            complete: () => dispatch(endScroll(endpoint))
        });
    }
}

function shouldScroll({status}, target) {
    return status.currentPage !== target
}

function getTarget(endpoint) {
    const target = $('.page-'+endpoint) // will always be 1
    if (!target) {
        throw new Error(`No .page-${endpoint} found`);
    } else return target
}

function startScroll(currentPage) {
    return {
        type: PAGE_SCROLL_STARTED,
        payload: currentPage
    }
}

function endScroll(currentPage) {
    return {
        type: PAGE_SCROLL_ENDED,
        payload: currentPage
    }
}

export function scrollHeader(makeVisible) {
    const $header = $('#header'), duration=300;
    var delay=0, easing='ease-in', top=`-${$header.height()}px`;

    if (makeVisible) {
        delay = 700
        top = 0
        easing = 'ease-out'
    }

    return dispatch => {
        return $header.velocity({top}, {duration, easing, delay})   
    }
}