import { combineReducers } from 'redux';
import BoardReducer from "./boardReducer";
import ThreadReducer from "./boardReducer";

const rootReducer = combineReducers({
    board: BoardReducer,
    thread: ThreadReducer
});

export default rootReducer
