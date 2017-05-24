import MainHeader from './MainHeader'

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
    unmonitorThread,
    navigateToView,
    toggleHomeView
} from '~/redux/actions';

import { isBoardFetchingSelector } from '~/redux/selectors/BoardSelectors'
import { boardIDSelector, threadIDSelector } from '~/redux/selectors/StatusSelectors'

function mapStateToProps(state) {
    return {
        boardID: boardIDSelector(state),
        threadID: threadIDSelector(state),
        boardIsFetching: isBoardFetchingSelector(state),

        // Non-selectors
        threadMonitor: state.threadMonitor,
        boardList: state.boardList,
        settings: state.settings
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
        unmonitorThread,
        navigateToView,
        toggleHomeView
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MainHeader)
