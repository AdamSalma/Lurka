import Axios from 'axios';

import API from '-/config/api.localhost'
import { alertMessage } from '../alert'
import {
    BOARD_LIST_REQUESTED,
    BOARD_LIST_LOADED,
    BOARD_LIST_INVALIDATED
} from '~/redux/types';



export default function fetchBoardList() {
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

export function requestBoardList() {
    return {
        type: BOARD_LIST_REQUESTED
    }
}

export function receiveBoardList(boardList, provider){
    return {
        type: BOARD_LIST_LOADED,
        payload: {
            items: boardList.data || [],
            receivedAt: Date.now(),
        }
    }
}

export function invalidateBoardlist(error) {
    return {
        type: BOARD_LIST_INVALIDATED,
        error
    }
}

export function shouldFetchBoardList({boardList}, provider) {
    return boardList.items.length === 0
}

