import Axios from 'axios';

import API from '-/config/api.4chan';
import options from '-/config/proxy';
import { parseBoardList } from '../../parsers';
import { writeObjToRoot } from '../../utils/inspector';

const url = API.boardlist()

export default function (req, res, next) {
    log.http(`Fetching boardList from ${url}`)

    Axios(url, options)
        .then( r => r.data.boards )
        .then( data => parseBoardList(data) )
        .then( boards => res.send(boards) )
        .catch( err => {
            log.error('Boardlist fetch error:', err)
            writeObjToRoot('4chan_boardlist_error.json', err)
            next(err)
        })

};



