import Axios from 'axios';
import { parseThread } from '../../services/4chanParser';
import { chan as options } from '../../config/requestHeaders.js';
import fs from 'fs';

export default function (req, res, next) {
    const { boardID, threadID } = req.params;
    const url = `http://a.4cdn.org/${boardID}/thread/${threadID}.json`;

    if (isNaN(threadID)) return next();
    
    log.http(`Fetching Thread from ${url}`)

    Axios(url, options)
        .then( ({data}) => {
            res.send(parseThread(data.posts, boardID))
        })
        .catch( err => {
            log.error(err.stack);
        });
};