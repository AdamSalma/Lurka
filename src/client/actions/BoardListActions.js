import Axios from 'axios';
import {
    BOARD_LIST_REQUESTED,
    BOARD_LIST_LOADED,
    BOARD_LIST_INVALIDATED,

    BOARD_LIST_ADD_FAVOURITE,
    BOARD_LIST_REMOVE_FAVOURITE,
} from '../constants';
import { alertMessage } from './StatusActions'

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
    return {
        type: BOARD_LIST_INVALIDATED
    }
}

export function fetchBoardList( provider ) {
    console.log(`Action FetchBoard() to /api/${provider}/boards`);
    return (dispatch, getState) => {
        if (shouldFetchBoardList(getState(), provider)) {
            dispatch(requestBoardList(provider))

            return Axios
                .get(`/api/${provider}/boards`)
                .then(data => dispatch(receiveBoardList(data, provider)))
                .catch( err => {
                    console.error(err)
                    dispatch(alertMessage({
                        message: `Couldn't request ${provider}s boardlist`,
                        type: "error"
                    }))
                    dispatch(invalidateBoard())
                });
        }
    }
}

function shouldFetchBoardList({boardList}, provider) {
    return !boardList.hasOwnProperty(provider)
}

export function addToFavourites(provider, boardID) {
    return (dispatch, getState) => {
        if (boardInFavourites(getState(), provider, boardID)) return

        dispatch({
            type: BOARD_LIST_ADD_FAVOURITE,
            payload: {
                provider,
                boardID
            }
        })
    }
}

export function removeFromFavourites(provider, boardID) {
    return (dispatch, getState) => {
        
        if (boardInFavourites(getState(), provider, boardID)) {
            dispatch({
                type: BOARD_LIST_REMOVE_FAVOURITE,
                payload: {
                    provider,
                    boardID
                }
            })
        }
    }
}

function boardInFavourites({boardList}, provider, boardID) {
    return !!boardList['favourites'].find(el => 
        el.boardID === boardID && el.provider === provider
    )
}
