import Axios from 'axios';

import options from '../../config/requestHeaders';
import { parseArchive } from '../../parsers/4chanParser'
import { fourchanAPI } from '../../config/apiEndpoints';
import { writeObjToRoot } from '../../services/inspector'
export default function (req, res, next) {
    const { boardID } = req.params;
    const url = fourchanAPI(boardID).archive
    log.http(`Fetching archive from ${url}`)
    Axios(url, options)
        .then( board => res.send(board.data) )  // TODO: Parse 4chan archive
        .catch( err => {
            log.error('Archive fetch error:', err)
            writeObjToRoot('4chan_archive_error.json', err)
            next(err)
        });
};
