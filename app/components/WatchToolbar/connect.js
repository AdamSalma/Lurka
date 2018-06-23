import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    fetchThread,
    addWatchEntity,
    removeWatchEntity,
    closeThread
} from '~/redux/actions';

import {
    getBoardID,
    getThreadID,
    getWatchQueue,
    getWatchResults,
    getWatchMetadata
} from '~/redux/selectors';

function mapStateToProps(state) {
    return {
        boardID: getBoardID(state),
        threadID: getThreadID(state),
        threads: getWatchQueue(state),
        results: getWatchResults(state),
        metadata: getWatchMetadata(state)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchThread,
        closeThread,
        addWatchEntity,
        removeWatchEntity
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
