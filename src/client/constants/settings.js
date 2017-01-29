module.exports = {
    "download-location": {
        type: 'OS',
        title: "Download location", 
        value: './',
        desc: "The default folder to save content to",
    },
    "stylesheet": {
        type: 'Interface',
        title: "Custom Styles",
        value: null,
        desc: "Insert a custom CSS stylesheet",
    },
    "NSFW": {
        type: 'Content',
        title: "NSFW",
        value: false,
        desc: "Over 18",
        checkbox: true
    },
    "boardUpdateInterval": {
        type: 'Resource Fetching',
        title: "Board Update",
        value: 15,
        desc: "Seconds to wait before updating the current board",
    },
    "threadUpdateInterval": {
        type: 'Resource Fetching',
        title: "Thread Update",
        value: 5,
        desc: "Seconds to wait before updating the current thread",
    },
    "requestThrottle": {
        disabled: true,
        type: 'Resource Fetching',
        title: "Limit Requests",
        value: 3,
        desc: "Limit seconds to wait between requests",
    },
    "maxBoardAge": {
        disabled: true,
        type: 'Resource Fetching',
        title: "Board Age",
        value: 900,  // 15 mins
        desc: "Maximum age (seconds) to load a board from history rather than a new request",
    },
    "maxThreadAge": {
        disabled: true,
        type: 'Resource Fetching',
        title: "Thread Age",
        value: 900,  // 15 mins
        desc: "Maximum age (seconds) to load a thread from history rather than a new request",
    },
    "muteWebM": {
        type: 'Content',
        title: "Auto-mute Videos",
        value: false,
        desc: "Mute WebM videos automatically when opened",
        checkbox: true
    },
    "homeBoard": {
        type: 'Content',
        title: 'Home Board',
        value: 'g',
        desc: 'Your home board that Lurka starts on'

    }
}
