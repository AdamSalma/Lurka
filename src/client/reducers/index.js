import { combineReducers } from 'redux';
import BoardReducer from "./BoardReducer";
import ThreadReducer from "./ThreadReducer";
import StatusReducer from "./StatusReducer";

const rootReducer = combineReducers({
    board: BoardReducer,
    thread: ThreadReducer,
    status: StatusReducer
});

export default rootReducer
