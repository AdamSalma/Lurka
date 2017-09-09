import { combineReducers } from 'redux';

import BoardReducer from "./BoardReducer";
import BoardlistReducer from "./BoardListReducer";
import CinemaReducer from "./CinemaReducer";
import CacheReducer from "./CacheReducer";
import ThreadReducer from "./ThreadReducer";
import WatcherReducer from "./WatcherReducer";
import PostReducer from "./PostReducer";
import SettingsReducer from "./SettingsReducer";
import StatusReducer from "./StatusReducer";

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
