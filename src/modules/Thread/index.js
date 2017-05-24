import Thread from './Thread'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    closeThread,
    monitorThread,
    unmonitorThread,
    scrollHeader,
    toggleHeaderPanel,
    destroyThread
} from '~/redux/actions';

function mapStateToProps({ status, thread }) {
    return {
        boardID: status.boardID,
        threadID: status.threadID,
        ...thread
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        closeThread,
        monitorThread,
        unmonitorThread,
        scrollHeader,
        toggleHeaderPanel,
        destroyThread
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Thread)
