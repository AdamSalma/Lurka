import { dispatch } from "pub-sub-es6";
import * as types from "./types";

export const emitAppReady = dispatch.bind(null, types.APP_READY);

export const emitSettingsToggle = dispatch.bind(null, types.TOGGLE_SETTINGS);
export const emitContentViewToggle = dispatch.bind(null, types.TOGGLE_CONTENT_VIEW);
export const emitSubHeaderToggle = dispatch.bind(null, types.SUB_HEADER_TOGGLE);

export const emitMediaReelOpen = dispatch.bind(null, types.OPEN_MEDIA_REEL);

export const emitThreadOpen = dispatch.bind(null, types.THREAD_OPEN);
export const emitThreadClose = dispatch.bind(null, types.THREAD_CLOSE);
export const emitThreadMove = dispatch.bind(null, types.THREAD_MOVE);

export const emitBoardReset = dispatch.bind(null, types.RESET_BOARD);

export const emitModalOpen = dispatch.bind(null, types.MODAL_OPEN);
export const emitModalClose = dispatch.bind(null, types.MODAL_CLOSE);

export const emitHeaderExpand = dispatch.bind(null, types.EXPAND_HEADER);
export const emitHeaderShrink = dispatch.bind(null, types.SHRINK_HEADER);

export const emitOpenHeaderPanel = dispatch.bind(null, types.OPEN_HEADER_PANEL);
export const emitCloseHeaderPanel = dispatch.bind(null, types.CLOSE_HEADER_PANEL);

export const emitUpdateWatchEntity = dispatch.bind(null, types.UPDATE_WATCH_ENTITY);

export const emitPostToggle = dispatch.bind(null, types.POST_TOGGLE);

export const emitThemeChange = dispatch.bind(null, types.THEME_CHANGE);
