module.exports = [
    {
        type: 'OS',
        title: "Download location", 
        value: './',
        desc: "The default folder to save content to",
        key: "download-location",
    },
    {
        type: 'Interface',
        title: "Custom Styles",
        value: null,
        desc: "Insert a custom CSS stylesheet",
        key: "stylesheet",
    },
    {
        type: 'Content',
        title: "NSFW",
        value: true,
        desc: "Over 18",
        key: "NSFW",
    },
    {
        type: 'Content',
        title: "Board Update",
        value: 15,
        desc: "Seconds to wait before updating the current board",
        key: "boardUpdateInterval",
    },
    {
        type: 'Content',
        title: "Thread Update",
        value: 5,
        desc: "Seconds to wait before updating the current thread",
        key: "threadUpdateInterval",
    },
    {
        disabled: true,
        type: 'Content',
        title: "Limit Requests",
        value: 3,
        desc: "Limit seconds to wait between requests",
        key: "requestThrottle",
    },
    {
        disabled: true,
        type: 'Content',
        title: "Board Age",
        value: 900,  // 15 mins
        desc: "Maximum age (seconds) to load a board from history rather than a new request",
        key: "maxBoardAge",
    },
    {
        disabled: true,
        type: 'Content',
        title: "Thread Age",
        value: 900,  // 15 mins
        desc: "Maximum age (seconds) to load a thread from history rather than a new request",
        key: "maxThreadAge",
    }
]
