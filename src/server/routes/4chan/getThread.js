import Axios from 'axios';
import { morphThread } from '../../helpers/morph-4chan';
import { chan as options } from '../../helpers/request-config.js';

export default function (req, res, next) {
    const boardID = req.params.boardID;
    const threadID = req.params.threadID;
    const url = `http://a.4cdn.org/${ boardID }/thread/${ threadID }.json`;

    if (isNaN(threadID)) next();
    
    log.http(`Getting Thread from ${url}`)

    options.headers['Origin'] = 'http://boards.4chan.org/' +boardID;
    Axios(url, options)
        .then( threads => res.send(morphThread(threads.data.posts, boardID)) )
        .catch( err => console.log(`ERROR - Thread fetch: ${err}`));
};