import { alertMessage } from '../alert'

const { errors } = window.appSettings;

export default {
    internalErrorAlert: (error) => {
        return alertMessage({
            message: errors.api.internalError,
            type: "error",
            time: 20000
        })
    },

    badStatusCodeAlert: ({ status, statusText }) => {
        return alertMessage({
            message: `${status} - ${statusText}`,
            type: "error",
            time: 5000
        })
    },

    noResponseAlert: () => {
        return alertMessage({
            message: errors.api.noResponse,
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
