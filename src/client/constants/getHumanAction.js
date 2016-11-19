import actions from '.';
export default function getHumanAction(action) {
    switch (action.type) {
        case actions.THREAD_REQUEST:
            return 'Fetching thread'
        case actions.BOARD_REQUEST:
            return 'Fetching board'
        default:
            return action
    }

}