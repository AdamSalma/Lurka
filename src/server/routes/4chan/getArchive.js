import Axios from 'axios';

import API from '../../../config/4chanAPI';
import options from '../../../config/proxy';
import { writeObjToRoot } from '../../services/inspector';
// TODO AS: Make a 4chan archive parser in server
// import { parseArchive } from '../../parsers';

export default function (req, res, next) {
    const { boardID } = req.params;
    const url = API.archive(boardID)
    log.http(`Fetching archive from ${url}`)
    Axios(url, options)
        .then( board => res.send(board.data) )  // TODO: Parse 4chan archive
        .catch( err => {
            log.error('Archive fetch error:', err)
            writeObjToRoot('4chan_archive_error.json', err)
            next(err)
        });
};
