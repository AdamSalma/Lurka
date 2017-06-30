import * as types from '../types'
import initialState from '../initialState';
import { createReducer, mergeState } from '~/utils/redux';

export default createReducer(initialState.settings, {
    [types.SETTING_CHANGED]: (state, action) =>
        mergeState(state, mergeState({}, state.external, {
            [action.payload.setting]: action.payload.value
        }))
});
