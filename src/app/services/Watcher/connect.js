import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    addWatchEntity,
    removeWatchEntity,
    updateWatchEntity
} from '~/redux/actions';


function mapStateToProps(state) {
    return {
        queue: state.watcher.entities.queue
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addWatchEntity,
        removeWatchEntity,
        updateWatchEntity
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
