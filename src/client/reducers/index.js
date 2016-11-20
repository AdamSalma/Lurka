import { combineReducers } from 'redux';
import ThreadReducer from "./ThreadReducer";
import BoardReducer from "./BoardReducer";
import BoardlistReducer from "./BoardlistReducer";
import StatusReducer from "./StatusReducer";
import SettingsReducer from "./SettingsReducer";

// TODO: Add PostReducer
const rootReducer = combineReducers({
    boardlist: BoardlistReducer,
    board: BoardReducer,
    thread: ThreadReducer,
    status: StatusReducer,
    settings: SettingsReducer
});

export default rootReducer
