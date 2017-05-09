import Axios from 'axios';
import moment from 'moment'

import API from '-/config/api.4chan';
import options from '-/config/proxy';
import { parseThread } from '../../parsers';
import { writeObjToRoot, printObj } from '../../services/inspector'


const timeFormat = 'ddd[,] M MMM YYYY hh:mm:ss [GMT]'

export default function (req, res, next) {
    const { boardID, threadID } = req.params;
    const { receivedAt } = req.query;
    const url = API.thread(boardID, threadID)

    if (receivedAt) {
        log.warn(`receivedAt: ${receivedAt}`)
        options.headers["If-Modified-Since"] = moment(parseInt(receivedAt)).format(timeFormat)
    }

    log.http(`Fetching Thread from ${url}`)

    Axios(url, options)
        .then( checkResponse )
        .then( response => response.data.posts )
        .then( posts => parseThread(posts, boardID))
        .then( thread => res.send(thread))
        .catch( err => {
            printObj(err)
            next(err)
        });
};


/**
 * Sometimes 4chan sends jpeg images instead of json.
 * This function validates a thread's response.
 */
function checkResponse(res) {
    if (!res || !res.data) {
        throw new Error('No response or response.data received')
    }

    if (!res.data.posts) {
        log.warn("No posts")
        printObj(err)
        writeObjToRoot('4chan_thread_error.json', res)
        throw new Error('No thread posts received. Written response to app/4chan_thread_error.json')
    }

    return res
}
