import Axios from 'axios';
import { parseBoardList } from '../../parsers/4chanParser';
import { chan as options } from '../../config/requestHeaders';
import { chan as getUrls } from '../../config/apiEndpoints';

export default function (req, res, next) {
    const url = getUrls(null, null).boardlist
	log.http(`Fetching boardList from ${url}`)
    Axios(url, options)
        .then( res2 => res.send(parseBoardList(res2.data.boards)) )
        .catch( err => {
            log.error(err.stack);
        });
};
