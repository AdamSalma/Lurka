import Axios from 'axios';

import API from '../../../config/4chanAPI';
import options from '../../../config/proxy';
import { parseBoardList } from '../../parsers';
import { writeObjToRoot } from '../../services/inspector';

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



