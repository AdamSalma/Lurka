import Axios from 'axios';
import { parseBoardList } from '../../services/redditParser';
import { reddit as options } from '../../config/requestHeaders.js';


export default function (req, res, next) {
    var {type, limit} = req.params

    log.info(req)
    // default, popular, new, gold
    // @param limit  - the maximum number of items desired (default: 25, maximum: 100)

    if (!type) {
        type = "default"
    }

    if (!limit) {
        limit = 50
    }

    const url = `http://reddit.com/subreddits/${type}/.json?limit=${limit}`;
    log.http(`GET Reddit boardList from ${url}`)
    Axios(url, options)
        .then( ({data}) => res.send(parseBoardList(data)) )
        .catch( err => {
            log.error(err.stack);
        });
};