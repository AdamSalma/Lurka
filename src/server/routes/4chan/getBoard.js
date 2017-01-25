import Axios from 'axios';

import { parseBoard } from '../../parsers/4chanParser';
import { chan as options } from '../../config/requestHeaders';
import { fourchanAPI } from '../../config/apiEndpoints';

export default function (req, res, next) {
    const { boardID } = req.params;
    const url = fourchanAPI(boardID).board
	log.http(`Fetching board from ${url}`)
    Axios(url, options)
        .then( board => res.send(parseBoard(board.data, boardID)) )
        .catch( err => next(err));
}
