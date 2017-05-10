import { dispatch } from "pub-sub-es6";
import * as types from "./types"

export const emitAppReady = dispatch.bind(null, types.APP_READY);

export const emitDrawerToggle = dispatch.bind(null, types.TOGGLE_DRAWER);
export const emitContentViewToggle = dispatch.bind(null, types.TOGGLE_CONTENT_VIEW);
