/**
 * For throttling events like "scroll" where there are multiple calls
 * in a short period of time.
 *
 * @param  {Integer}  count    - Ho
 * @param  {Function} callback - function to call when condition is met
 * @return {Function}
 */
export const throttleByCount = (count, callback) => {
    var i = 0

    return function() {
        if (i >= count) {
            i = 0
            return callback.apply(null, arguments)
        }
        i++
    }
}

/**
 * Runs a function then ignores any other calls for a period of time
 *
 * @param  {Integer}  time     - milliseconds to ignore calls
 * @param  {Function} callback - function to call when condition is met
 * @return {Function}
 */
export const invokeThenIgnoreForPeriod = (time, callback) => {
    var canCall = true

    return function() {
        if (canCall) {
            canCall = false
            setTimeout(() => canCall = true, time)
            return callback.apply(null, arguments)
        }
    }
}

/**
 * Runs a function after a delay. The delay is reset for every call, but only
 * one callback invocation will occur.
 *
 * i.e. if "delay" = 1000, and 10 calls were made at 50ms intervals, there
 * will only be one call after a 1500 pause (since the first call)
 *
 * @param  {Integer}  delay    - delay in miliseconds
 * @param  {Function} callback - function to call when condition is met
 * @return {Function}
 */
export const invokeAfterUninterruptedDelay = (delay, callback) => {
    var calls = 0

    return function () {
        calls++
        setTimeout(() => {
            calls--
            if (calls === 0)
                callback.apply(null, arguments)
        }, delay)
    }
}

export const invokeOnceThenAgainAfterUninterruptedDelay = (delay, callback) => {
    var calls = 0

    return function () {
        if (calls === 0) {
            return callback.apply(null, arguments)
        }

        calls++
        setTimeout(() => {
            calls--
            if (calls === 0)
                callback.apply(null, arguments)
        }, delay)
    }
}


export const invokeAtBeginingEndAndByCount = ({delay, count, callback}) => {
    var calls = 0;
    var counter = 0;

    return function () {
        if (!calls || counter >= count) {
            if (counter) {
                counter = 0
            }
            return callback.apply(null, arguments)
        }

        calls++
        counter++

        setTimeout(() => {
            calls--
            if (calls === 0) {
                callback.apply(null, arguments)
                counter = 0
            }
        }, delay)
    }
}
