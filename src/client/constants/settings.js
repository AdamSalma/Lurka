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
        disabled: true,
        type: 'Content',
        title: "NSFW",
        value: 15,
        desc: "Seconds to wait before updating the current board",
        key: "boardUpdateInterval",
    },
    {
        disabled: true,
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
    }
]
