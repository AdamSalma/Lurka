import Axios from 'axios';
import {
    BOARD_LIST_REQUESTED,
    BOARD_LIST_LOADED,

    BOARD_LIST_SEARCH_REQUESTED,
    BOARD_LIST_SEARCH_LOADED,

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
    console.error("ERROR:")
    console.warn(error)
    return {
        type: BOARD_LIST_INVALIDATED,
        error
    }
}

export function fetchBoardList( provider ) {
    console.log(`Action fetchBoardList() to /api/${provider}/boards`);
    return (dispatch, getState) => {
        if (shouldFetchBoardList(getState(), provider)) {
            dispatch(requestBoardList(provider))

            return Axios
                .get(`/api/${provider}/boards`)
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





// TODO: remove searchBoardlist
export function searchBoardlist(provider, query) {
    const url = `/api/${provider}/boards/search`
    console.log(`Action searchBoardlist() to ${url}`);
    return (dispatch, getState) => {
        dispatch(boardListSearch(provider, query))

        return Axios
            .get(url)
            .then( data => dispatch(receiveBoardListSearch(data, provider)))
            .catch( err => {
                dispatch(alertMessage({
                    message: `${err.message} (from ${provider})`,
                    type: "error",
                    time: 20000
                }))
                dispatch(invalidateBoardlist(err))
            });
    }
}

function boardListSearch(provider, query) {
    return {
        type: BOARD_LIST_SEARCH_REQUESTED,
        provider,
        query
    }
}

function receiveBoardListSearch({data=[]}, provider) {
    return {
        type: BOARD_LIST_SEARCH_LOADED,
        payload: data,
        provider
    }  
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
