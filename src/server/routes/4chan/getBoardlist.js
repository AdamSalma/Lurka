import Axios from 'axios';

import options from '../../config/requestHeaders';
import { parseBoardList } from '../../parsers/4chanParser';
import { fourchanAPI } from '../../config/apiEndpoints';
import { writeObjToRoot } from '../../services/inspector'


export default function (req, res, next) {
    const url = fourchanAPI(null, null).boardlist
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



