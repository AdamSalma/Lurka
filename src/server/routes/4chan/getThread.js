import Axios from 'axios';
import moment from 'moment'

import options from '../../config/requestHeaders';
import { parseThread } from '../../parsers/4chanParser';
import { fourchanAPI } from '../../config/apiEndpoints';
import { writeObjToRoot, printObj } from '../../services/inspector'


const timeFormat = 'ddd[,] M MMM YYYY hh:mm:ss [GMT]'

export default function (req, res, next) {
    const { boardID, threadID } = req.params;
    const { receivedAt } = req.query;
    const url = fourchanAPI(boardID, threadID).thread

    if (receivedAt) {
        log.warn(`receivedAt: ${receivedAt}`)
        options.headers["If-Modified-Since"] = moment(parseInt(receivedAt)).format(timeFormat)
    }

    log.http(`Fetching Thread from ${url}`)

    Axios(url, options)
        .then( response => response.data.posts )
        .then( posts => parseThread(posts, boardID))
        .then( thread => res.send(thread))
        .catch( err => {
            printObj(err)
            writeObjToRoot('4chan_thread_error.json', err.response)
            next(err)
        });
};
