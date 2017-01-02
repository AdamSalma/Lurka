import Axios from 'axios';
import { parseBoardList } from '../../parsers/redditParser';
import { reddit as options } from '../../config/requestHeaders';
import { reddit as getUrls } from '../../config/apiEndpoints';

export default function (req, res, next) {
    const url = getUrls(req.params).subreddits
    log.http(`GET Reddit boardlist: ${url}`)

    Axios(url, options)
        .then(  res2 => res.send(parseBoardList(res2.data)) )
        .catch( err => {
            log.error(err.stack);
        });
};
