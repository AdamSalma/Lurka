import { combineReducers } from 'redux';

import BoardReducer from "./board";
import BoardlistReducer from "./board-list";
import CacheReducer from "./cache";
import DisplayReducer from "./display";
import ThreadReducer from "./thread";
import ThreadMonitorReducer from "./thread-monitor";
import StatusReducer from "./status";
import SettingsReducer from "./settings";

// TODO: Add PostReducer
const rootReducer = combineReducers({
    boardList: BoardlistReducer,
    board: BoardReducer,
    display: DisplayReducer,
    thread: ThreadReducer,
    cache: CacheReducer,
    status: StatusReducer,
    settings: SettingsReducer,
    threadMonitor: ThreadMonitorReducer,
});

export default rootReducer
