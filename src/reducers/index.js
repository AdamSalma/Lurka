import { combineReducers } from 'redux';
import BoardReducer from "./boardReducer";

const rootReducer = combineReducers({
    board: BoardReducer
});

export default rootReducer
