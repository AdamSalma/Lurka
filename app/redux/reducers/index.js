import { combineReducers } from 'redux';

import BoardReducer from "./boardReducer";
import BoardlistReducer from "./boardListReducer";
import CinemaReducer from "./cinemaReducer";
import CacheReducer from "./cacheReducer";
import ThreadReducer from "./threadReducer";
import WatcherReducer from "./watcherReducer";
import PostReducer from "./postReducer";
import SettingsReducer from "./settingsReducer";
import StatusReducer from "./statusReducer";

const rootReducer = combineReducers({
    boardList: BoardlistReducer,
    board: BoardReducer,
    cinema: CinemaReducer,
    thread: ThreadReducer,
    cache: CacheReducer,
    post: PostReducer,
    status: StatusReducer,
    settings: SettingsReducer,
    watcher: WatcherReducer,
});

export default rootReducer
