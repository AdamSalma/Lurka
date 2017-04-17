import * as types from '../types'

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
        type: types.HEADER_TOGGLED,
        toVisible
    }
}

function shouldScrollHeader({status:{ isHeaderVisible }}, toVisible) {    
    return isHeaderVisible !== toVisible
}
