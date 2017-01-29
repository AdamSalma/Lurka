/**
 * Contains the initialisation code used to set up the app for 
 * first time usage.
 */


// The below DOM elements are directly embedded into index.html. 
// They are decoupled from React and can therefore be manipulated freely.
var   preloading = true
const preloadScreenEl = $('#preload-screen')
const preloadTextEl = preloadScreenEl.find('#preload-status-text')


/**
 * Updates the preload screen with the state of the application.
 */
export default function updatePreloader() {
    if (!preloading) {
        return
    }

    let text
    const { boardList, status:{provider, alertMessage} } = window.getState()
    const preloadComplete = boardList[provider] && boardList[provider].length

    if (boardList.didInvalidate) {
        // Handle the error
        // TODO: Make the error screen more graphical; add 'X' image
        text = alertMessage.message
        preloadTextEl.removeClass('elipses')
    } 

    else if (preloadComplete) {
        text = "Fetching boards"
    } 

    else {
        preloading = false
        text = "Ready"
        preloadScreenEl.addClass('loaded')   
        preloadTextEl.removeClass('elipses')
    }

    preloadTextEl.text(text)
}
