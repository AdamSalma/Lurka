import initialState from './initialState';
import { 
    HEADER_SHRINKING, 
    HEADER_EXPANDING, 
    HEADER_ANIMATION_ENDED, 
    LOGO_SPIN_STARTED, 
    LOGO_SPIN_ENDED, 
    SCROLL_STARTED, 
    SCROLL_ENDED,
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

        case HEADER_ANIMATION_ENDED:
            return Object.assign({}, state, {
                isAnimating: false,
                isMainPage: !state.isMainPage
            })

        case SCROLL_STARTED:
            return Object.assign({}, state, {
                isScrolling: false,
                loadingMessage: action.type
            })
            
        case SCROLL_ENDED:
            return Object.assign({}, state, {
                isScrolling: false,
            })


        case LOGO_SPIN_STARTED:
            return Object.assign({}, state, {
                isLogoSpinning: true,
                loadingMessage: action.payload
            })

        case LOGO_SPIN_ENDED:
            return Object.assign({}, state, {
                isLogoSpinning: false,
                loadingMessage: null
            })

        default:
            return state
    }
}
