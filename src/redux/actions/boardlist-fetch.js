import Axios from 'axios';

import API from '~/config/api'
import { alertMessage } from './alert'
import {
    BOARD_LIST_REQUESTED,
    BOARD_LIST_LOADED,
    BOARD_LIST_INVALIDATED
} from '../types';


function requestBoardList(provider) {
    return {
        payload: provider,
        type: BOARD_LIST_REQUESTED
    }
}

function receiveBoardList(boardList, provider){
    return {
        type: BOARD_LIST_LOADED,
        payload: boardList.data || [],
        provider
    }
}

function invalidateBoardlist(error) {
    console.error("ERROR:")
    console.warn(error)
    return {
        type: BOARD_LIST_INVALIDATED,
        error
    }
}

export function fetchBoardList( provider ) {
    const url = API.boardlist()
    console.log(`Action fetchBoardList() to ${url}`);
    return (dispatch, getState) => {
        if (shouldFetchBoardList(getState(), provider)) {
            dispatch(requestBoardList(provider))

            return Axios.get(url)
                .then( data => dispatch(receiveBoardList(data, provider)))
                .catch( err => {
                    dispatch(alertMessage({
                        message: `From boardlist: ${err.response.data}`,
                        type: "error",
                        time: 20000
                    }))
                    dispatch(invalidateBoardlist(err.response.data))
                });
        }
    }
}

function shouldFetchBoardList({boardList}, provider) {
    return !boardList.hasOwnProperty(provider)
}

