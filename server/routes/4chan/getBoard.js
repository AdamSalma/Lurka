import Axios from 'axios';
import {morphBoard} from '../helpers/morph-4chan';
import defaultRequest from '../helpers/request-config-4chan.js';

export const getBoard = (req, res, next) => {
    const boardID = req.params.boardID;
    const url = 'https://a.4cdn.org/' +boardID+ '/catalog.json';
    console.log("Board::", url, defaultRequest)
    Axios(url, defaultRequest)
        .then( board => {
            res.send(morphBoard(board.data, boardID))
        }).catch(err => console.log(`ERROR - Board fetch: ${err}`))
};