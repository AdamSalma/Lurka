import Axios from 'axios';
import { parseBoardList } from '../../parsers/redditParser';
import { reddit as options } from '../../config/requestHeaders';
import { redditAPI } from '../../config/apiEndpoints';

export default function (req, res, next) {
    const url = redditAPI.subreddits(req.params)
    log.http(`GET Reddit boardlist: ${url}`)

    Axios(url, options)
        .then(  reddit => res.send(parseBoardList(reddit.data)) )
        .catch( err => next(err));
};
