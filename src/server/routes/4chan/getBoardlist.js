import Axios from 'axios';
import { parseBoardList } from '../../services/4chanParser';
import { chan as options } from '../../config/requestHeaders.js';


export default function (req, res, next) {
    const url = `http://a.4cdn.org/boards.json`;
	log.http(`Fetching boardList from ${url}`)
    Axios(url, options)
        .then( boardList => res.send(parseBoardList(boardList.data.boards)) )
        .catch( err => {
            log.error(err.stack);
        });
};