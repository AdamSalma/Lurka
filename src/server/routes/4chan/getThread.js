import Axios from 'axios';

import { parseThread } from '../../parsers/4chanParser';
import { chan as options } from '../../config/requestHeaders';
import { fourchanAPI } from '../../config/apiEndpoints';


export default function (req, res, next) {
    const { boardID, threadID } = req.params;
    const url = fourchanAPI(boardID, threadID).thread

    log.http(`Fetching Thread from ${url}`)

    Axios(url, options)
        .then( ({data: {posts}}) => res.send(parseThread(posts, boardID)))
        .catch( err => next(err));
};
