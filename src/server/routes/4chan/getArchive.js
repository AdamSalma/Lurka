import Express from 'express';
import { chan as options } from '../../config/requestHeaders.js';

export default function (req, res, next) {
    const { boardID } = req.params;
    const url = `https://a.4cdn.org/${boardID}/archive.json`
    log.http(`Fetching archive from ${url}`)
    Axios(url, options)
        .then( board => res.send(board.data) )  // TODO: Parse 4chan archive
        .catch( err => {
            log.error(err.stack);
        });
};
