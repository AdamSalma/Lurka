/**
 * Usage:
 *
 * import utils from '/path/to/utils'
 *
 * utils.time.getShortTimeAgo
 */

import * as conversions from './conversions'
import * as dom from './dom'
import * as localStorage from './localStorage'
import * as react from './react'
import * as redux from './redux'
import * as throttle from './throttle'
import * as time from './time'
import * as types from './types'
import * as designPatterns from './designPatterns'


export default {
    conversions, dom, react, redux, throttle, time, types, localStorage, designPatterns
}


/* Don't import these - are imported elsewhere once only */
// export * from './logger'
// export * from './polyfills'
