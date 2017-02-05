import initialState from '~/constants/initialState';
import { 
    THREAD_MONITOR_CREATED,
    THREAD_MONITOR_DELETED,
    THREAD_MONITOR_UPDATED,
} from '~/constants'

// TODO: when a user inspects new posts - a counter of some sort; notifications

export default function (state = initialState.threadMonitor, action) {
    switch (action.type) {

        case THREAD_MONITOR_CREATED:

        case THREAD_MONITOR_DELETED:

        case THREAD_MONITOR_UPDATED:
            // return {}
            // return {}
            // return {}

        default:
            return state
    }
}
