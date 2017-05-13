import Axios from 'axios';

import API from '-/config/api.localhost'
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
        payload: {
            items: boardList.data || [],
            receivedAt: Date.now(),
        }
    }
}

function invalidateBoardlist(error) {
    return {
        type: BOARD_LIST_INVALIDATED,
        error
    }
}

export function fetchBoardList() {
    const url = API.boardlist()
    console.log(`Action fetchBoardList() to ${url}`);
    return (dispatch, getState) => {
        if (shouldFetchBoardList(getState())) {
            dispatch(requestBoardList())

            return Axios.get(url)
                .then( data => dispatch(receiveBoardList(data)))
                .catch( err => {
                    console.error(err)
                    dispatch(alertMessage({
                        message: `From boardlist: ${err.response.data}`,
                        type: "error",
                        time: 20000
                    }))
                    dispatch(invalidateBoardlist(err.response.data || err))
                });
        }
    }
}

function shouldFetchBoardList({boardList}, provider) {
    return boardList.items.length === 0
}

