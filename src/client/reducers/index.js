import { combineReducers } from 'redux';
import BoardReducer from "./board.reducer";
import ThreadReducer from "./thread.reducer";
import StateReducer from "./status.reducer";

const rootReducer = combineReducers({
    board: BoardReducer,
    thread: ThreadReducer,
    status: StateReducer
});

export default rootReducer
