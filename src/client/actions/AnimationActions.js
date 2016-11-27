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

    const offset = up ? 0 : window.innerHeight   

    return (dispatch, getState) => {
        if (!shouldScroll(getState(), endpoint)) return;
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
    console.log($('.page-home'))
    console.log($('.page-content'))
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
    const $header = $('#header');
    const offset = makeVisible 
        ? 0
        : `-${$header.height()}px`;
    console.warn("scrolling header to", offset)
    $header.velocity({top: offset}, {duration: 300, easing: 'ease-in', delay: 700})
    // Velocity($header, {top: offset}, 200, 'ease-in')
}