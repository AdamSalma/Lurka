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
        type: 'Resource Fetching',
        title: "Board Update",
        value: 15,
        desc: "Seconds to wait before updating the current board",
        key: "boardUpdateInterval",
    },
    {
        type: 'Resource Fetching',
        title: "Thread Update",
        value: 5,
        desc: "Seconds to wait before updating the current thread",
        key: "threadUpdateInterval",
    },
    {
        disabled: true,
        type: 'Resource Fetching',
        title: "Limit Requests",
        value: 3,
        desc: "Limit seconds to wait between requests",
        key: "requestThrottle",
    },
    {
        disabled: true,
        type: 'Resource Fetching',
        title: "Board Age",
        value: 900,  // 15 mins
        desc: "Maximum age (seconds) to load a board from history rather than a new request",
        key: "maxBoardAge",
    },
    {
        disabled: true,
        type: 'Resource Fetching',
        title: "Thread Age",
        value: 900,  // 15 mins
        desc: "Maximum age (seconds) to load a thread from history rather than a new request",
        key: "maxThreadAge",
    },
    {
        type: 'Content',
        title: "Auto-mute Videos",
        value: false,
        desc: "Mute WebM videos automatically when opened",
        key: "maxBoardAge",
    },
]
