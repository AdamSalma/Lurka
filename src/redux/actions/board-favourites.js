import Axios from 'axios';

import {
    BOARD_LIST_ADD_FAVOURITE,
    BOARD_LIST_REMOVE_FAVOURITE,
} from '../types';


export function addToFavourites(provider, boardID) {
    return (dispatch, getState) => {
        if (boardInFavourites(getState(), provider, boardID)) 
            return

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
