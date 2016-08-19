import { TEST } from '../constants'

const initialState = {
    isFetching: false,
    didInvalidate: false,
    items: []
};

export default function (state=initialState, action) {
    console.group("Board Reducer");
    console.log(state, action);
    switch (action.type) {
        case TEST:
            console.log("Switch statement test success");
            console.groupEnd();
        default:
            console.groupEnd();
            return state
    }
}
