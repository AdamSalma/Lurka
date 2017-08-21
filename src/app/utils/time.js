import moment from 'moment'

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


export const getShortTimeAgo = (time) => {
    const secs = secondsAgo(time)

    const days = secs/60/60/24;
    if (days > 1) {
        return Math.floor(days) + 'd ago';
    }

    const hours = secs/60/60;
    if (hours > 1) {
        return Math.floor(hours) + 'h ago';
    }

    const minutes = secs/60;
    if (minutes > 1) {
        return Math.floor(minutes) + 'm ago';
    }

    return Math.floor(secs) + 's ago';
}


export const timestampToGMT = (timestamp) => {
  // return moment(timestamp).format('ddd[,] M MMM YYYY hh:mm:ss [GMT]')
  return moment(timestamp).utc().format('ddd[,] D MMM YYYY HH:mm:ss [GMT]')
}

window.timestampToGMT = () => timestampToGMT.bind(null, Date.now());
window.moment = moment
