import { combineReducers } from 'redux';

import apiReducer from "./apiReducer";
import boardReducer from "./boardReducer";
import boardlistReducer from "./boardListReducer";
import cinemaReducer from "./cinemaReducer";
import cacheReducer from "./cacheReducer";
import threadReducer from "./threadReducer";
import watcherReducer from "./watcherReducer";
import postReducer from "./postReducer";
import settingsReducer from "./settingsReducer";
import statusReducer from "./statusReducer";

const rootReducer = combineReducers({
    api: apiReducer,
    boardList: boardlistReducer,
    board: boardReducer,
    cinema: cinemaReducer,
    thread: threadReducer,
    cache: cacheReducer,
    post: postReducer,
    status: statusReducer,
    settings: settingsReducer,
    watcher: watcherReducer,
});

export default rootReducer
