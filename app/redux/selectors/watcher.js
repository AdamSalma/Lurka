import {createSelector} from 'reselect';

import {getThreadID} from './status';

export const getWatchMetadata = (state) => state.watcher.entities.metadata;
export const getWatchQueue = (state) => state.watcher.entities.queue;
export const getWatchResults = (state) => state.watcher.entities.results;

export const isCurrentThreadBeingWatched = createSelector(
    getThreadID,
    getWatchMetadata,
    (threadId, metadata) => !!metadata[threadId]
)
