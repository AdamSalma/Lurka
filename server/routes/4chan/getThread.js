import Axios from 'axios';
import { morphThread } from '../helpers/morph-4chan';
import defaultRequest from '../helpers/request-config-4chan.js';

export const getThread = (req, res, next) => {
    const boardID = req.params.boardID;
    const threadID = req.params.threadID;
    const url = 'http://a.4cdn.org/'+boardID+'/thread/'+threadID+'.json';

    if (isNaN(threadID)) next();

    defaultRequest.headers['Origin'] = 'http://boards.4chan.org/' +boardID;
    Axios(url, defaultRequest)
        .then(function(threads) {
            res.send(morphThread(threads.data.posts, boardID));
        }).catch( err => console.log(`ERROR - Thread fetch: ${err}`));
};