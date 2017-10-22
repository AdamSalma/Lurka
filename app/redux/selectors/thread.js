export const getThreadPosts = (state) => state.thread.posts;
export const getThreadReceivedAt = (state) => state.thread.receivedAt;

// export const getWatchMetadata = (state) => state.watch.threads;

export const isThreadBeingWatched = (state, threadID) =>
    !!getMonitoredThreads(state)
        .find(thread => thread.threadID === threadID)
