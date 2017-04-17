import {
    ALERT_MESSAGE
} from '../types'


export function alertMessage( message ) {
    console.info(`Action alertMessage(): ${message.message}`);

    return {
        type: ALERT_MESSAGE,
        payload: message
    }   
}
