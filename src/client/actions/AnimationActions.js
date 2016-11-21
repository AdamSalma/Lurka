import Velocity from 'velocity-animate'
import {
	PAGE_SCROLL_STARTED,
	PAGE_SCROLL_ENDED
} from '../constants'

export function scrollPage({ content=false, mainPage=false })  {
	if (!content && !mainPage) {
		throw new Error("No scroll destination supplied")
	}
	
	const offset = content ? window.innerHeight : 0;

	return dispatch => {
        dispatch({type: PAGE_SCROLL_STARTED});
        return Velocity(document.body, 'scroll', {
        	offset: offset, 
        	duration: 1000, 
        	easing: "ease-in-out", 
        	complete: () => {
        		dispatch({type: PAGE_SCROLL_ENDED})
        	}
       	});
    }
}