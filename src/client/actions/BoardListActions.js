import {
    BOARD_LIST_REQUESTED,
    BOARD_LIST_LOADED,
    BOARD_LIST_INVALIDATED,

    BOARD_LIST_ADD_FAVOURITE,
    BOARD_LIST_REMOVE_FAVOURITE,
} from '../constants';


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
                    dispatch(statusMessage(`Error: Couldn't request ${provider}s boards`))
                    dispatch(invalidateBoard())
                });
        }
    }
}

function shouldFetchBoardList({boardList}, provider) {
    return !boardList.hasOwnProperty(provider)
}
