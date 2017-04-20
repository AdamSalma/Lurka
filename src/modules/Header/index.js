import Header from './Header'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    fetchBoardList,
    fetchBoard,
    closeThread,
    destroyBoard,
    toggleDrawer,
    fetchThread,
    updateMonitoredThread,
    monitorThread,
    unmonitorThread
} from '~/redux/actions';

function mapStateToProps({ status, display, boardList, threadMonitor, settings }) {
    return {
        status,
        activePanel: display.activeHeaderPanel,
        isThreadOpen: display.isThreadOpen,
        isDrawerOpen: display.isDrawerOpen,
        boardID: status.boardID,
        threadID: status.threadID,
        threadMonitor,
        boardList,
        settings,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchBoardList,
        fetchBoard,
        closeThread,
        destroyBoard,
        toggleDrawer,
        fetchThread,
        updateMonitoredThread,
        monitorThread,
        unmonitorThread
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
