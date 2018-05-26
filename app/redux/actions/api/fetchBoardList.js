// import Axios from 'axios';
// import Api from 'config/api.4chan'
// import {parseBoardList} from '~/parsers'

import Api from '~/api'

import {
    BOARD_LIST_REQUESTED,
    BOARD_LIST_LOADED,
    BOARD_LIST_INVALIDATED
} from '~/redux/types';
import {isFunction} from '~/utils/types';
import alerts from './alerts';

export default function fetchBoardList(callback) {
    return (dispatch, getState) => {
        if (!shouldFetchBoardList(getState())) {
            console.warn("Boardlist fetch rejected; Already fetched and is recent")
            isFunction(callback) && callback()
            return
        }

        dispatch(boardlistRequested())

        return Api.fetchBoardList()
            .then( boardList => dispatch(receiveBoardList(boardList)))
            .catch( err => {
                console.error(`Boardlist fetch error:`, err);

                if (err.response) {
                    dispatch(alerts.badStatusCodeAlert(err.response))
                } else if (err.request) {
                    dispatch(alerts.noResponseAlert())
                } else {
                    dispatch(alerts.internalErrorAlert(err))
                }

                dispatch(invalidateBoardlist(err))
            });
    }
}

export function boardlistRequested() {
    return {
        type: BOARD_LIST_REQUESTED
    }
}

export function receiveBoardList(boardList, provider){
    return {
        type: BOARD_LIST_LOADED,
        payload: {
            items: boardList,
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

