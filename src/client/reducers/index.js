import { combineReducers } from 'redux';

import BoardReducer from "./BoardReducer";
import BoardlistReducer from "./BoardlistReducer";
import BoardHistoryReducer from "./BoardHistoryReducer";

import ThreadReducer from "./ThreadReducer";
import ThreadHistoryReducer from "./ThreadHistoryReducer";
import ThreadMonitor from "./ThreadMonitor";

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
    settings: SettingsReducer,
    threadMonitor: ThreadMonitor
});

export default rootReducer
