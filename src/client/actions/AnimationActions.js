import Velocity from 'velocity-animate'
import {
    HEADER_TOGGLED,
    NAVBAR_TOGGLED
} from '../constants'


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

function shouldScrollHeader({status:{ isHeaderVisible }}, toVisible) {    
    return isHeaderVisible !== toVisible
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
