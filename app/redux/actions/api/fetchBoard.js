import * as types from '~/redux/types';
import Api from '~/api'

import {alertMessage} from '../alert'
import {secondsAgo} from '~/utils/time'

import alerts from './alerts';


export default function fetchBoard(boardID, callback) {
    console.log('Action FetchBoard()', boardID);

    return (dispatch, getState) => {
        const state = getState();

        // TODO: Remove as no longer needed; cache stores ALL board posts over time,
        // so this would return ALL posts, not the most recent.

        // if (boardCachedAndRecent(state, boardID)) {
        //     dispatch(loadBoardFromCache(state, boardID))
        //     dispatch(setBoard(boardID))
        //     // TODO: Use timeago for cache alerts to show how old cached item is
        //     dispatch(alerts.cachedBoardLoaded(boardID))
        //     return
        // }

        dispatch(requestBoard(boardID))
        dispatch(alerts.requestingBoard(boardID));

        return Api.fetchBoard(boardID)
            // Storing the fetched data
            .then(board => {
                dispatch(setBoard(boardID))
                dispatch(receiveBoardPosts(board, boardID))
                return board;
            })
            // Let people know that the board's been fetched
            .then((board) => callback && callback(null, board))
            // Catch any errors
            .catch( err => {
                console.error(`/${boardID}/ fetch error:`, err);

                if (err.response) {
                    dispatch(alerts.badStatusCodeAlert(err.response))
                } else if (err.request) {
                    dispatch(alerts.noResponseAlert())
                } else {
                    dispatch(alerts.internalErrorAlert(err))
                }

                dispatch(invalidateBoard(err))

                callback && callback(err);
            });
    }
}

export function requestBoard(boardID) {
    return {
        type: types.BOARD_REQUESTED,
        payload: boardID
    }
}

export function receiveBoardPosts(board, boardID){
    return {
        type: types.BOARD_LOADED,
        posts: board,
        receivedAt: Date.now(),
        boardID: boardID
    }
}

export function invalidateBoard(error) {
    return {
        type: types.BOARD_INVALIDATED,
        error
    }
}

export function setBoard( boardID ) {
    return {
        type: types.BOARD_CHANGE,
        payload: boardID
    }
}

export function shouldRequestBoard({ board, settings }) {
    const requestThrottle = settings.internal.requestThrottle
    const lastRequested = secondsAgo(board.receivedAt)

    console.log(`shouldRequestBoard(): ${lastRequested} > ${requestThrottle} = ${lastRequested > requestThrottle}`)
    return !board.isFetching && lastRequested > requestThrottle
}

export function boardCachedAndRecent({cache, settings}, boardID) {
    const maxBoardAge = settings.internal.maxBoardAge
    const board = cache.board[boardID]

    if (!board){
        console.warn('Board was not in cache')
    } else {
        console.warn(`DID EXIST. ${secondsAgo(board.receivedAt)} < ${maxBoardAge} = ${secondsAgo(board.receivedAt) < maxBoardAge}`)
        console.warn(board)
    }
    return board && secondsAgo(board.receivedAt) < maxBoardAge
}

export function loadBoardFromCache({ cache }, boardID) {
    const board = cache.board[boardID]
    return {
        type: types.BOARD_CACHE_LOADED,
        payload: board,
        boardID,
    }
}


