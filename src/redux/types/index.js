/* User settings */
// TODO: make user actions do stuff
export const USER_SAVED_POST = "USER_SAVED_POST"
export const USER_SAVED_MEDIA = "USER_SAVED_MEDIA"
export const USER_SAVED_BOARD = "USER_SAVED_BOARD"
export const USER_SAVED_THREAD = "USER_SAVED_THREAD"
export const USER_LOADED_ARCHIVE = "USER_LOADED_ARCHIVE"
export const USER_NAVIGATED = "USER_NAVIGATED"

/* Settings */
export const SETTINGS_LOADED = "SETTINGS_LOADED"
export const SETTINGS_SAVED = "SETTINGS_SAVED"
export const SETTING_CHANGED = "SETTING_CHANGED"


/**
 * Content
 */


// Board
export const BOARD_REQUESTED = "BOARD_REQUESTED"
export const BOARD_LOADED = "BOARD_LOADED"
export const BOARD_DESTROYED = "BOARD_DESTROYED"
export const BOARD_INVALIDATED = "BOARD_INVALIDATED"
export const BOARD_SEARCHED = "BOARD_SEARCHED"

export const BOARD_CACHE_LOADED = "BOARD_CACHE_LOADED"
export const BOARD_CACHED = "BOARD_CACHED"
export const BOARD_CACHE_CLEARED = "BOARD_CACHE_CLEARED"


// Board list
export const BOARD_LIST_REQUESTED = "BOARD_LIST_REQUESTED"
export const BOARD_LIST_LOADED = "BOARD_LIST_LOADED"
export const BOARD_LIST_INVALIDATED = "BOARD_LIST_INVALIDATED"

export const BOARD_LIST_ADD_FAVOURITE = "BOARD_LIST_ADD_FAVOURITE"
export const BOARD_LIST_REMOVE_FAVOURITE = "BOARD_LIST_REMOVE_FAVOURITE"


// Thread
export const THREAD_REQUESTED = "THREAD_REQUESTED"
export const THREAD_LOADED = "THREAD_LOADED"
export const THREAD_DESTROYED = "THREAD_DESTROYED"
export const THREAD_INVALIDATED = "THREAD_INVALIDATED"

export const THREAD_CACHE_LOADED = "THREAD_CACHE_LOADED"
export const THREAD_CACHED = "THREAD_CACHED"
export const THREAD_CACHE_CLEARED = "THREAD_CACHE_CLEARED"

export const THREAD_MONITOR_ADDED = "THREAD_MONITOR_ADDED"
export const THREAD_MONITOR_DELETED = "THREAD_MONITOR_DELETED"
export const THREAD_MONITOR_UPDATED = "THREAD_MONITOR_UPDATED"

export const THREAD_SCROLLED_BOTTOM = "THREAD_SCROLLED_BOTTOM"


/* Status */
export const BOARD_CHANGE = "BOARD_CHANGE"
export const THREAD_CHANGE = "THREAD_CHANGE"
export const PROVIDER_CHANGE = "PROVIDER_CHANGE"

export const ALERT_MESSAGE = "ALERT_MESSAGE"

/* Header */
export const HEADER_TOGGLED = "HEADER_TOGGLED"
export const HEADER_PANEL_CLOSED = "HEADER_PANEL_CLOSED"
export const HEADER_PANEL_OPENED = "HEADER_PANEL_OPENED"

export const NAVBAR_TOGGLED = "NAVBAR_TOGGLED"
export const DRAWER_TOGGLED = "DRAWER_TOGGLED"
export const PAGE_SCROLL_STARTED = "PAGE_SCROLL_STARTED"
export const PAGE_SCROLL_ENDED = "PAGE_SCROLL_ENDED"



// TODO: IDEA -- store pubsub variables in localstorage. pubsub state tree
// TODO: IDEA -- preloader start page is LURKA in caps, big font size. underneath to the right is "loading..."
// TODO: IDEA -- url for electron and webpack: make iffe in src/config.js
// TODO: IDEA -- Nested reducers
// TODO: IDEA -- scroll events using throttled pub-sub. BOARD_SCROLLED THREAD_SCROLLED and toggle navbar based on that.
// TODO: IDEA -- move state's internal settings to config/public.settings.js
