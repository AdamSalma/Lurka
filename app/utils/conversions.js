const KB = 1024
const MB = 1048576
const GB = 1073741824

/**
 * Converts bytes into human readable formats
 * @param  {Integer} bytes
 * @return {Object}
 */
export const convertBytes = (bytes) => {
    return {
        kilobytes: (bytes/KB).toFixed(2)+" KB",
        megabytes: (bytes/MB).toFixed(2)+" MB",
        gigabytes: (bytes/GB).toFixed(2)+" GB"
    }
}

/**
 * returns a string split by commas every 3 digits from the right.
 * e.g. 12345 returns "12,345"
 * @param  {Integer}
 * @return {String}
 */
export const commaify = (int) => {
    return String(int)
            .split('').reverse().join('')  // reverse string
            .match(/[\s\S]{1,3}/g).join(',')  // split into groups of 3 from left (from right)
            .split('').reverse().join('')  // reverse string again
}


export const toDecimal = (num, dp=1) => Math.round(num * (dp * 10)) / (dp * 10)
