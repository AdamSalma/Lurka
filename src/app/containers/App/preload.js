import {
    emitAppReady as onPreloadSuccess
} from '~/events/publishers'

/**
 * Contains the initialisation code used to set up the app for
 * first time usage.
 */


/**
 * Updates the preload screen with the state of the application.
 */

export const createPreloader = function() {
    // The below DOM elements are directly embedded into index.html.
    // They are decoupled from React and can therefore be manipulated freely.
    const preloadScreenEl = $('#preload-screen')
    const preloadTextEl = preloadScreenEl.find('#preload-status-text')
    const loadTimeout = 100

    return function ({board, boardList, alertMessage}) {
        const boardListFetched = boardList.items && boardList.items.length > 0
        const boardFetched = board.posts && board.posts.length > 0

        let text

        if (boardList.didInvalidate || board.didInvalidate) {
            // Handle the error
            // TODO: Make the error screen more graphical; add 'X' image
            text = alertMessage.message
            preloadTextEl.removeClass('elipses')
        }

        else if (!boardListFetched || !boardFetched) {
            if (!boardListFetched && !boardFetched) {
                text = 'Fetching board + boardlist'
            } else {
                text = `Fetching ${boardListFetched ? 'board' : 'boardlist'}`
            }
        }

        else {
            text = "Initialising"
            setTimeout(() => {
                preloadTextEl.text("Ready")
                preloadScreenEl.addClass('loaded')
                preloadTextEl.removeClass('elipses')
                onPreloadSuccess()
            }, loadTimeout)
        }

        preloadTextEl.text(text)
    }
}

export const fetchInitialContent = (props) => {
    if (!props.boardList.items.length) {
        props.fetchBoardList()
    }

    if (!props.board.posts.length && !props.board.isFetching) {
        props.fetchBoard(props.homeBoard)
    }
}
