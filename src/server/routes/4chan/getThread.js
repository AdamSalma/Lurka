import Axios from 'axios';

import { parseThread } from '../../parsers/4chanParser';
import { chan as options } from '../../config/requestHeaders';
import { chan as getUrls } from '../../config/apiEndpoints';


export default function (req, res, next) {
    const { boardID, threadID } = req.params;
    const url = getUrls(boardID, threadID).thread

    log.http(`Fetching Thread from ${url}`)

    Axios(url, options)
        .then( ({data}) => {
            res.send(parseThread(data.posts, boardID))
        })
        .catch( err => {
            log.error(err.stack);
        });
};
