import * as types from '../types'
import initialState from '../initialState';
import { createReducer } from '~/utils/redux';

export default createReducer(initialState.settings, {
    [types.SETTING_CHANGED]: (state, action) =>
        Object.assign({}, state, Object.assign({}, state.external, {
            [action.payload.setting]: action.payload.value
        }))
});
