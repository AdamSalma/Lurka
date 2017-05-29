export const getThreadPosts = (state) => state.thread.posts;
export const getThreadReceivedAt = (state) => state.thread.receivedAt;

export const getMonitoredThreads = (state) => state.watch.threads;

export const isThreadBeingMonitored = (state, threadID) =>
    !!getMonitoredThreads(state)
        .find(thread => thread.threadID === threadID)
