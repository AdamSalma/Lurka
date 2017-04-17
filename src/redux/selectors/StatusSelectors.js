import { createSelector } from 'reselect'

export const boardIDSelector = state => state.status.boardID
export const threadIDSelector = state => state.status.threadID
export const providerSelector = state => state.status.provider
export const alertMessageSelector = state => state.status.alertMessage

export const hierarchySelector = createSelector(
    providerSelector,
    boardIDSelector,
    threadIDSelector,
    (provider, board, thread) => `${provider}/${board}/${thread}`
)
