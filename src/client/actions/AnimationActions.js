import Velocity from 'velocity-animate'
import {
	PAGE_SCROLL_STARTED,
	PAGE_SCROLL_ENDED,
    SCROLL_HEADER
} from '../constants'

const scrollEndpoints = ["content", "settings"]  // "home" is immovable
const scrollDuration = 1000
const scrollEasing = "ease-in-out"

export function scrollPage(endpoint, up) {

    if ( !scrollEndpoints.includes(endpoint) ) 
        throw new Error("Invalid scroll endpoint supplied to action");

    const top = up ? 0 : window.innerHeight   
    const $target = getTarget(endpoint)

    return (dispatch, getState) => {
        if (up && !shouldScroll(getState(), endpoint)) return;

        $target.velocity("stop");
        dispatch(startScroll(endpoint));

        return $target.velocity({top}, {
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
            dispatch(headerScroll(toVisible))
            return $header.velocity(
                {top}, 
                {duration, easing, delay}
            )
        }
    }
}

function headerScroll(toVisible) {
    return {
        type: SCROLL_HEADER,
        payload: toVisible
    }
}

function shouldScrollHeader({status:{ isHeaderVisible }}, toVisible) {    
    return isHeaderVisible !== toVisible 
}

