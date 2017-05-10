import { on } from 'pub-sub-es6';
import * as types from './types';

/**
 * Event subscribers used as component decorators
 *
 * @onAppReady
 * onAppReady() { ... }
 */

// Note: Subscribers must use `function` not `=>` because of scope binding

export const onAppReady = function() {
    on(types.APP_READY).apply(null, arguments);
}

export const onContentViewToggle = function() {
    on(types.TOGGLE_CONTENT_VIEW).apply(null, arguments);
}

export const onDrawerToggle = function() {
    on(types.TOGGLE_DRAWER).apply(null, arguments);
}
