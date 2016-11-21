import Axios from 'axios';
import { parseBoard } from '../../services/4chanParser';
import { chan as options } from '../../config/requestHeaders.js';

export default function (req, res, next) {
    const { boardID } = req.params;
    const url = `https://a.4cdn.org/${boardID}/catalog.json`;
	log.http(`Fetching board from ${url}`)
    Axios(url, options)
        .then( board => res.send(parseBoard(board.data, boardID)) )
        .catch( err => {
            log.error(err.stack);
        });
}