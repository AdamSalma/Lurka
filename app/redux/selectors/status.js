import { createSelector } from 'reselect'

export const getAlertMessage = state => state.status.alertMessage

export const getThreadID = (state) => state.status.threadID
export const getBoardID = (state) => state.status.boardID
