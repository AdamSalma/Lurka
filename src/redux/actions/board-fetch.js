import Axios from 'axios';

import API from '~/config/api'
import {alertMessage} from './alert'
import {secondsAgo} from '~/utils'
import {
    BOARD_REQUESTED, 
    BOARD_LOADED, 
    BOARD_INVALIDATED,
    BOARD_CHANGE
} from '../types';


function requestBoard(boardID) {
    return {
        type: BOARD_REQUESTED,
        payload: boardID
    }
}

function receiveBoard(board){
    return {
        type: BOARD_LOADED,
        posts: board.data || [],
        receivedAt: Date.now()
    }
}

function invalidateBoard(error) {
    console.error(error)
    return {
        type: BOARD_INVALIDATED
    }
}

function setBoard( boardID ) {
    console.log("Setting board to " + boardID)
    return {
        type: BOARD_CHANGE,
        payload: boardID
    }
}

export function fetchBoard({ provider="4chan", boardID }) {
    const url = API.board(boardID)
    console.log('Action FetchBoard()', url);

    return (dispatch, getState) => {
        const state = getState()
        if (!canRequestBoard(state)) {
            console.warn(`Board request rejected: ${provider}/${boardID}`)
            return
        }

        if ( boardInHistoryAndRecent(state, boardID)) {
            dispatch(loadBoardFromHistory(state, boardID))
            dispatch(setBoard(boardID))
            dispatch(alertMessage({
                message: `Loading board from history: /${boardID}/`,
                type: "success"
            }))
            return
        }

        dispatch(requestBoard(boardID))
        dispatch(alertMessage({
            message: `Requesting /${boardID}/`,
            type: "info"
        }))

        return Axios.get(url)
            .then( data => {
                dispatch(receiveBoard(data))
                dispatch(setBoard(boardID))
            })
            .catch( err => {
                console.error(err)
                dispatch(alertMessage({
                    message: `From board ${boardID}: ${err.response.data}`,
                    type: "error",
                    time: 20000
                }))
                dispatch(invalidateBoard(err.response.data))
            });
    }
}

function canRequestBoard({ board, settings }) {
    const requestThrottle = settings["requestThrottle"].value
    const lastRequested = secondsAgo(board.receivedAt)

    console.log(`canRequestBoard(): ${lastRequested} > ${requestThrottle} = ${lastRequested > requestThrottle}`)
    return !board.isFetching && lastRequested > requestThrottle
}

function boardInHistoryAndRecent({boardHistory, settings}, boardID) {
    const maxBoardAge = settings["maxBoardAge"].value
    const board = boardHistory[boardID]

    if (!board){
        console.warn('Board was not in history')
    } else {
        console.warn(`DID EXIST. ${secondsAgo(board.receivedAt)} < ${maxBoardAge} = ${secondsAgo(board.receivedAt) < maxBoardAge}`)
        console.warn(board)
    }
    return board && secondsAgo(board.receivedAt) < maxBoardAge
}

function loadBoardFromHistory({ boardHistory }, boardID) {
    const board = boardHistory[boardID]
    return {
        type: BOARD_LOADED_FROM_HISTORY,
        payload: board,
        boardID,
    }
}


