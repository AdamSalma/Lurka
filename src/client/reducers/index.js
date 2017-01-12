import { combineReducers } from 'redux';
import ThreadReducer from "./ThreadReducer";
import BoardReducer from "./BoardReducer";
import BoardHistoryReducer from "./BoardHistoryReducer";
import ThreadHistoryReducer from "./ThreadHistoryReducer";
import BoardlistReducer from "./BoardlistReducer";
import StatusReducer from "./StatusReducer";
import SettingsReducer from "./SettingsReducer";

// TODO: Add PostReducer
const rootReducer = combineReducers({
    boardList: BoardlistReducer,
    board: BoardReducer,
    boardHistory: BoardHistoryReducer,
    thread: ThreadReducer,
    threadHistory: ThreadHistoryReducer,
    status: StatusReducer,
    settings: SettingsReducer
});

export default rootReducer
