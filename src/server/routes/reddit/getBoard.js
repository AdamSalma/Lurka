import Axios from 'axios';

import { parseBoard } from '../../parsers/redditParser';
import { reddit as options } from '../../config/requestHeaders';
import { redditAPI } from '../../config/apiEndpoints';


// TODO: pass reddit post limit from frontend
export default function (req, res, next) {
    const url = redditAPI.board(req.params)
	log.http(`Fetching board from ${url}`)
    Axios(url, options)
        .then( board => res.send( parseBoard(board.data) ))
        .catch( err => next(err));
}
