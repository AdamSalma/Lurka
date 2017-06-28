import SubHeader from './SubHeader'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    fetchBoardList,
    fetchBoard,
    closeThread,
    destroyBoard,
    fetchThread,
    updateMonitoredThread,
    monitorThread,
    unmonitorThread,
    searchBoard,
} from '~/redux/actions';

import {
    getIsBoardFetching,
    getBoardID,
    getThreadID
} from '~/redux/selectors'

function mapStateToProps(state) {
    return {
        boardID: getBoardID(state),
        threadID: getThreadID(state),
        boardIsFetching: getIsBoardFetching(state),

        // Non-selectors
        watch: state.watch,
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
        fetchThread,
        updateMonitoredThread,
        monitorThread,
        unmonitorThread,
        searchBoard,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SubHeader)
