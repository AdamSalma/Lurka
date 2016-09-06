import { combineReducers } from 'redux';
import BoardReducer from "./board.reducer";
import ThreadReducer from "./thread.reducer";

const rootReducer = combineReducers({
    board: BoardReducer,
    thread: ThreadReducer
});

export default rootReducer
