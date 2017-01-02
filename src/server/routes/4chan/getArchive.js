import Axios from 'axios';

import { parseArchive } from '../../parsers/4chanParser'
import { chan as options } from '../../config/requestHeaders';
import { chan as getUrls } from '../../config/apiEndpoints';

export default function (req, res, next) {
    const { boardID } = req.params;
    const url = getUrls(boardID).archive
    log.http(`Fetching archive from ${url}`)
    Axios(url, options)
        .then( board => res.send(board.data) )  // TODO: Parse 4chan archive
        .catch( err => {
            log.error(err.stack);
        });
};
