import { alertMessage } from '../alert'

export default {
    internalErrorAlert: (error) => {
        return alertMessage({
            message: Lurka.errors.apiInternalError,
            type: "error",
            time: 20000
        })
    },

    badStatusCodeAlert: ({ status, statusText }) => {
        return alertMessage({
            message: `${statusText} (${status})`,
            type: "error",
            time: 6000
        })
    },

    noResponseAlert: () => {
        return alertMessage({
            message: Lurka.errors.apiNoResponse,
            type: "error",
            time: 20000
        })
    },

    requestingBoard: (boardID) => {
        return alertMessage({
            message: `Requesting /${boardID}/`,
            type: "info"
        })
    },

    cachedBoardLoaded: (boardID) => {
        return alertMessage({
            message: `Loaded /${boardID}/ from cache`,
            type: "success"
        })
    },

    cachedThreadLoaded: (threadID) => {
        return alertMessage({
            message: `Loading thread ${threadID} from cache`,
            type: "success"
        })
    },

    requestingThread: (threadID) => {
        return alertMessage({
            message: `Requesting thread ${threadID}`,
            type: 'info'
        })
    }

}
