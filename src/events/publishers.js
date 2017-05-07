import { dispatch } from "pub-sub-es6";
import * as types from "./types"

export const emitDrawerToggle = () => {
    dispatch(types.DRAWER_TOGGLE);
}
