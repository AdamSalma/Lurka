import initialState from './initialState';
import { 
	HEADER_SHRINKING, 
	HEADER_EXPANDING, 
	HEADER_ANIMATION_END, 
	LOGO_SPIN_START, 
	LOGO_SPIN_END, 
	SCROLL_START, 
	SCROLL_END,
	APP_INIT
} from '../constants';

export default function (state = initialState.status, action) {
    switch (action.type) {

   		case APP_INIT:
   			return Object.assign({}, state, {
                isMainPage: true
            })

    	case HEADER_EXPANDING:
    	case HEADER_SHRINKING:
    		return Object.assign({}, state, {
                isAnimating: true
            })

        case HEADER_ANIMATION_END:
			return Object.assign({}, state, {
                isAnimating: false,
                isMainPage: !state.isMainPage
            })        	

        default:
            return state
    }
}
