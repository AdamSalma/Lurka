// Descriptions etc for configurable settings. Structure is:

// key: { details, schema: { }}

export default {
    theme: {
        group: 'Appearance',
        title: 'Theme',
        desc: 'Light/Dark'
    },
    nsfw: {
        group: 'Content',
        title: 'NSFW',
        desc: 'Allow over 18 content',
        schema: {
            type: 'boolean',
            default: true
        }
    },
    downloadLocation: {
        group: 'Storage',
        title: 'Download location',
        desc: 'The default folder to save content to',
        schema: {
            type: 'string',
            default: '~/Downloads/Lurka',
            // Other stuff...
        }
    },
    boardUpdateInterval: {
        group: 'Content',
        title: 'Board Update',
        desc: 'Seconds to wait before updating the current board',
        schema: {
            type: 'number',
            default: 15,
            // Other stuff...
        }
    },
    homeBoard: {
        group: 'Content',
        title: 'Home Board',
        desc: 'Your home board that Lurka starts on',
        schema: {
            type: 'string',
            default: '/g/',
            // Other stuff...
        }
    },
    threadUpdateInterval: {
        group: 'Content',
        title: 'Thread Update',
        desc: 'Seconds to wait before updating the current thread',
        schema: {
            type: 'number',
            default: 5,
            // Other stuff...
        }
    },
    requestThrottle: {
        group: 'Content',
        title: 'Limit Requests',
        desc: 'Limit seconds to wait between requests',
        schema: {
            type: 'number',
            default: 1,
            // Other stuff...
        }
    },
    maxBoardAge: {
        group: 'Content',
        title: 'Board Age',
        desc: 'Maximum age (seconds) to load a board from history rather than a new request',
        schema: {
            type: 'number',
            default: 800,
            // Other stuff...
        }
    },
    maxThreadAge: {
        group: 'Content',
        title: 'Thread Age',
        desc: 'Maximum age (seconds) to load a thread from history rather than a new request',
        schema: {
            type: 'number',
            default: 800,
            // Other stuff...
        }
    },
    autoMute: {
        group: 'Content',
        title: 'Auto-mute Videos',
        desc: 'Mute WebM videos automatically when opened',
        schema: {
            type: 'boolean',
            default: true,
            // Other stuff...
        }
    },
}


