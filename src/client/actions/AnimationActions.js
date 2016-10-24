import Velocity from 'velocity-animate'

import {
	SCROLL_START,
	SCROLL_END,
    HEADER_ANIMATION_END,
    HEADER_SHRINKING,
    HEADER_EXPANDING
} from '../constants'

export function scrollPage({ content=false, mainPage=false })  {
	if (!content && !mainPage) {
		throw new Error("No scroll destination supplied")
	}
	
	const offset = content ? window.innerHeight : 0;

	return dispatch => {
        dispatch({type: SCROLL_START});
        return Velocity(document.body, 'scroll', {
        	offset: offset, 
        	duration: 1000, 
        	easing: "ease-in-out", 
        	complete: () => {
        		dispatch({type: SCROLL_END})
        	}
       	});
    }
}


export function shrinkHeader() {
    const header = document.querySelector('#header');
    const logo   = document.querySelector('#logo');
    const $board  = $('#board');

    const logoDistanceFromLeft = window.innerWidth - 90 + "px"
    let animationCompleteCount = 0

    $board.nanoScroller({ sliderMaxHeight: 120, sliderMinHeight: 60, stop: true })

    return dispatch => {
        dispatch({type: HEADER_SHRINKING})

        Velocity(header, {height: "70px"}, {
            duration: 1000,
            complete: isComplete

        })

        Velocity(logo, {right: logoDistanceFromLeft, top: "10px", width: "50px"}, {
            duration: 1000,
            easing: "ease-out",
            complete: isComplete
        })

        function isComplete() {
            animationCompleteCount++
            if (animationCompleteCount == 2) {
                dispatch({type: HEADER_ANIMATION_END})
                $board.nanoScroller({ stop: false })
            }
        }
        
    }
}

export function expandHeader() {
    const header = document.querySelector('#header');
    const logo   = document.querySelector('#logo');
    let animationCompleteCount = 0

    return dispatch => {
        dispatch({type: HEADER_EXPANDING})

        Velocity( header, {height: "270px"}, {
            duration: 1000, 
            easing: "ease-out",
            complete: isComplete
        })

        Velocity(logo, {right: 0, top: "70px", width: "200px"}, {
            duration: 1000,
            easing: "ease-out",
            complete: isComplete
        })

        function isComplete() {
            animationCompleteCount++
            if (animationCompleteCount == 2) {
                dispatch({type: HEADER_ANIMATION_END})
            }
        }
    }
}