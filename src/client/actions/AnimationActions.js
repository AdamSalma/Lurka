import Velocity from 'velocity-animate'
import {
	PAGE_SCROLL_STARTED,
	PAGE_SCROLL_ENDED,
    HEADER_TOGGLED,
    NAVBAR_TOGGLED
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
            return $header.velocity(
                {top}, {duration, easing, delay, complete: () => dispatch(headerToggle())}
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



export function toggleNavbar({open, duration=400, delay=0, easing='ease-in'}) {
    console.log('toggleNavbar()')
    const $navbar = $('#navbar');
    const closeNavbar = parseInt($navbar.position().left) < 0

    let set = open !== undefined
    var left

    console.warn($navbar.position().left);

    if ((set && open) || closeNavbar) {
        console.warn('Making navbar visible')
        left = 0;
        easing = [0.215, 0.61, 0.355, 1]
    } else {
        console.warn('Making navbar invisible')
        left = `-${$navbar.width()}px`;
        duration = 300
    }

    return (dispatch, getState) => {
        if (!shouldToggleNavbar(getState(), closeNavbar))
            return

        $navbar.velocity("stop");
        return $navbar.velocity(
            {left}, {duration, easing, delay, complete: () => dispatch(navbarToggle(!closeNavbar))}
        ) 
    }
}

function navbarToggle(navbarIsOpen) {
    return {
        type: NAVBAR_TOGGLED,
        payload: navbarIsOpen
    }
}

function shouldToggleNavbar({ status: isNavbarOpen}, closeNavbar) {
    return isNavbarOpen !== closeNavbar
}
