import Axios from 'axios';
import { parseBoardList } from '../../services/4chanParser';
import { chan as options } from '../../config/requestHeaders.js';


export default function (req, res, next) {
    const url = `http://a.4cdn.org/boards.json`;
	log.http(`Fetching boardlist from ${url}`)
    Axios(url, options)
        .then( boardlist => res.send(parseBoardList(boardlist.data.boards)) )
        .catch( err => console.log(`ERROR - Boardlist fetch ${err}`));
};