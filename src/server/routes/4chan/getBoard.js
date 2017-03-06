import Axios from 'axios';

import options from '../../config/requestHeaders';
import { parseBoard } from '../../parsers/4chanParser';
import { fourchanAPI } from '../../config/apiEndpoints';
import { writeObjToRoot } from '../../services/inspector'


export default function (req, res, next) {
    const { boardID } = req.params;
    const url = fourchanAPI(boardID).board
    log.http(`Fetching board from ${url}`)
    Axios(url, options)
        .then( r => r.data )
        .then( data => parseBoard(data, boardID) )
        .then( board => res.send(board) )
        .catch( err => {
            log.error('Board fetch error:', err)
            writeObjToRoot('4chan_board_error.json', err)
            next(err)
        });
}
