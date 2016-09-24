import Axios from 'axios';
import {extractBoardList} from '../../helpers/morph-4chan';
import defaultRequest from '../../helpers/request-config-4chan.js';

export default function (req, res, next) {
    const url = `http://a.4cdn.org/boards.json`;
    Axios(url, defaultRequest)
        .then(function(boardlist) {
            res.send(extractBoardList(boardlist.data.boards));
        }).catch( err => console.log(`ERROR - Boardlist fetch ${err}`));
};