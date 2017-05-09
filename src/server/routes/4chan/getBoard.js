import Axios from 'axios';

import API from '-/config/api.4chan';
import options from '-/config/proxy';
import { parseBoard } from '../../parsers';
import { writeObjToRoot } from '../../services/inspector'

export default function (req, res, next) {
    const { boardID } = req.params;
    const url = API.board(boardID)
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
