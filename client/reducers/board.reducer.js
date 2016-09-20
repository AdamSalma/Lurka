import { 
    BOARD_LOADED, 
    BOARD_LIST_LOADED, 
    BOARD_REQUEST 
} from '../constants'

const initialState = {
    isFetching: false,
    didInvalidate: false,
    boardList: [],
    items: []
};

export default function (state=initialState, action) {
    switch (action.type) {
        case BOARD_REQUEST:
            return Object.assign({}, state, {
                isFetching: true  
            })

        case BOARD_LOADED:
            return Object.assign({}, state, {
                items: action.payload,
                isFetching: false
            })

        case BOARD_LIST_LOADED:
            return Object.assign({}, state, {
                boardList: action.payload
            })

        default:
            return state
    }
}
