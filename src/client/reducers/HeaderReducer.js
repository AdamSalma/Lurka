import { HEADER_ANIMATE } from '../constants';
import initialState from './initialState';


export default function (state = initialState.header, action) {
    console.info(state, action)
    switch (action.type) {

        case HEADER_ANIMATE:
            console.info("REDUCER HEADER_ANIMATE")
            return Object.assign({}, state, {
                isMainPage: !state.header.isMainPage
            })

        default:
            return state
    }
}
