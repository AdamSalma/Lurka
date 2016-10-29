import { combineReducers } from 'redux';
import ContentReducer from "./ContentReducer";
import StatusReducer from "./StatusReducer";
import SettingsReducer from "./SettingsReducer";


const rootReducer = combineReducers({
    content: ContentReducer,
    status: StatusReducer,
    settings: SettingsReducer
});

export default rootReducer
