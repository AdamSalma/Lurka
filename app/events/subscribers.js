import { on } from 'pub-sub-es6';
import * as types from './types';

/**
 * Event subscribers used as component method decorators
 *
 * @onAppReady
 * onAppReady(eventArgs) { ... }
 */

// Note: Subscribers must use `function` not `=>` because of scope binding

export const onAppReady = function () {
    on(types.APP_READY).apply(null, arguments);
}

export const onContentViewToggle = function () {
    on(types.TOGGLE_CONTENT_VIEW).apply(null, arguments);
}

export const onSettingsToggle = function () {
    on(types.TOGGLE_SETTINGS).apply(null, arguments);
}

export const onMediaReelOpen = function () {
    on(types.OPEN_MEDIA_REEL).apply(null, arguments);
}

export const onThreadOpen = function () {
    on(types.THREAD_OPEN).apply(null, arguments);
}

export const onThreadClose = function () {
    on(types.THREAD_CLOSE).apply(null, arguments);
}

export const onThreadMove = function () {
    on(types.THREAD_MOVE).apply(null, arguments);
}

export const onSubHeaderToggle = function () {
    on(types.SUB_HEADER_TOGGLE).apply(null, arguments);
}

export const onBoardReset = function () {
    on(types.RESET_BOARD).apply(null, arguments);
}

export const onModalOpen = function () {
    on(types.OPEN_MODAL).apply(null, arguments);
}

export const onModalClose = function () {
    on(types.CLOSE_MODAL).apply(null, arguments);
}

export const onHeaderShrink = function () {
    on(types.SHRINK_HEADER).apply(null, arguments);
}

export const onHeaderExpand = function () {
    on(types.EXPAND_HEADER).apply(null, arguments);
}

export const onHeaderToggled = function () {
    on(types.HEADER_TOGGLED).apply(null, arguments);
}

export const onHeaderPanelOpen = function () {
    on(types.OPEN_HEADER_PANEL).apply(null, arguments);
}

export const onHeaderPanelClose = function () {
    on(types.CLOSE_HEADER_PANEL).apply(null, arguments);
}

export const onHeaderPanelClosed = function () {
    on(types.HEADER_PANEL_CLOSED).apply(null, arguments);
}

export const onHeaderPanelOpened = function () {
    on(types.HEADER_PANEL_OPENED).apply(null, arguments);
}

export const onUpdateWatchEntity = function () {
    on(types.UPDATE_WATCH_ENTITY).apply(null, arguments);
}

export const onPostToggle = function () {
    on(types.POST_TOGGLE).apply(null, arguments);
}

export const onThemeChange = function () {
    on(types.THEME_CHANGE).apply(null, arguments);
}

export const onOpenContextMenu = function () {
    on(types.OPEN_CONTEXT_MENU).apply(null, arguments);
}

export const onCloseContextMenu = function () {
    on(types.CLOSE_CONTEXT_MENU).apply(null, arguments);
}
