import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    fetchThread,
    addWatchEntity,
    removeWatchEntity,
} from '~/redux/actions';

import {
    getBoardID,
    getThreadID,
    getWatchQueue,
    getWatchResults,
    getWatchMetadata
} from '~/redux/selectors';

function mapStateToProps(state) {
    console.error("WatchPanel.mapStateToProps")
    return {
        boardID: getBoardID(state),
        threadID: getThreadID(state),
        queue: getWatchQueue(state),
        results: getWatchResults(state),
        metadata: getWatchMetadata(state)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchThread,
        addWatchEntity,
        removeWatchEntity
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps, null, {withRef: true})
