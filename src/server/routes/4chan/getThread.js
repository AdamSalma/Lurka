import Axios from 'axios';

import { parseThread } from '../../parsers/4chanParser';
import { chan as options } from '../../config/requestHeaders';
import { fourchanAPI } from '../../config/apiEndpoints';

import moment from 'moment'

const timeFormat = 'ddd[,] M MMM YYYY hh:mm:ss [GMT]'

export default function (req, res, next) {
    const { boardID, threadID, requestedAt } = req.params;
    const url = fourchanAPI(boardID, threadID).thread

    log.info("requestedAt:",requestedAt)
    if (requestedAt) {
        options['If-Modified-Since'] = moment(requestedAt).format(timeFormat)
    }

    log.http(`Fetching Thread from ${url}`)

    Axios(url, options)
        .then( ({data: {posts}}) => res.send(parseThread(posts, boardID)))
        .catch( err => next(err));
};
