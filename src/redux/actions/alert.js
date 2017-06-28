import * as types from '../types'


export function alertMessage( message ) {
    console.info(`Action alertMessage(): ${message.message}`);

    return {
        type: types.ALERT_MESSAGE,
        payload: message
    }
}
