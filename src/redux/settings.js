export const details = {
    theme: {
        group: 'Appearance',
        title: 'Theme',
        desc: 'Light/Dark'
    },
    nsfw: {
        group: 'Content',
        title: 'NSFW',
        desc: 'Allow over 18 content',
        boolean: true
    },
    downloadLocation: {
        group: 'Storage',
        title: 'Download location',
        desc: 'The default folder to save content to',
    },
    boardUpdateInterval: {
        group: 'Content',
        title: 'Board Update',
        desc: 'Seconds to wait before updating the current board',
    },
    homeBoard: {
        group: 'Content',
        title: 'Home Board',
        desc: 'Your home board that Lurka starts on'
    },
    threadUpdateInterval: {
        group: 'Content',
        title: 'Thread Update',
        desc: 'Seconds to wait before updating the current thread',
    },
    requestThrottle: {
        group: 'Content',
        title: 'Limit Requests',
        desc: 'Limit seconds to wait between requests',
    },
    maxBoardAge: {
        group: 'Content',
        title: 'Board Age',
        desc: 'Maximum age (seconds) to load a board from history rather than a new request',
    },
    maxThreadAge: {
        group: 'Content',
        title: 'Thread Age',
        desc: 'Maximum age (seconds) to load a thread from history rather than a new request',
    },
    autoMute: {
        group: 'Content',
        title: 'Auto-mute Videos',
        desc: 'Mute WebM videos automatically when opened',
        boolean: true
    },
}
