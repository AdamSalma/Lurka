import { combineReducers } from 'redux';

import BoardReducer from "./BoardReducer";
import BoardlistReducer from "./BoardListReducer";
import CinemaReducer from "./CinemaReducer";
import CacheReducer from "./CacheReducer";
import ThreadReducer from "./ThreadReducer";
import WatcherReducer from "./WatcherReducer";
import StatusReducer from "./StatusReducer";
import SettingsReducer from "./SettingsReducer";

// TODO: Add PostReducer
const rootReducer = combineReducers({
    boardList: BoardlistReducer,
    board: BoardReducer,
    cinema: CinemaReducer,
    thread: ThreadReducer,
    cache: CacheReducer,
    status: StatusReducer,
    settings: SettingsReducer,
    watcher: WatcherReducer,
});

export default rootReducer
