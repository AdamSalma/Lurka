import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    closeThread,
    addWatchEntity,
    removeWatchEntity,
    scrollHeader,
    toggleHeaderPanel,
    destroyThread,
    cacheCurrentThread,
} from '~/redux/actions';

import {
    getBoardID,
    getThreadID,
    isCurrentThreadBeingWatched
} from '~/redux/selectors';

function mapStateToProps(state) {
    return {
        boardID: getBoardID(state),
        threadID: getThreadID(state),
        isBeingWatched: isCurrentThreadBeingWatched(state),
        ...state.thread,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        closeThread,
        addWatchEntity,
        removeWatchEntity,
        scrollHeader,
        toggleHeaderPanel,
        destroyThread,
        cacheCurrentThread
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
