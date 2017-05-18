/**
 * Converts a timestamp to seconds ago
 * @param  {Integer} timestamp - From calling Date.now()
 * @return {Integer}           - Seconds since timestamp
 */
export const secondsAgo = (timestamp) => {
    return (Date.now() - timestamp) / 1000
}

/**
 * Converts milliseconds to a more readable format:
 *   formatTimeInterval(1000) -> "1 sec"
 *   formatTimeInterval(100000) -> "1 min 40 secs"
 *
 * @param  {Integer} time
 * @return {String}
 */
export const formatTimeInterval = (time) => {
  var mins = Math.floor(time / 60000)
  var secs = (time - mins * 60000) / 1000
  var str = secs + (secs === 1 ? ' sec' : ' secs')

  if (mins) {
    str = mins + (mins === 1 ? ' min ' : ' mins ') + str
  }

  return str
}
