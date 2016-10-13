import { combineReducers } from 'redux';
import BoardReducer from "./BoardReducer";
import ThreadReducer from "./ThreadReducer";
import StatusReducer from "./StatusReducer";
import HeaderReducer from "./HeaderReducer";


const rootReducer = combineReducers({
    board: BoardReducer,
    thread: ThreadReducer,
    status: StatusReducer,
    header: HeaderReducer
});

export default rootReducer
