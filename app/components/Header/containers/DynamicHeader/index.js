import DynamicHeader from './DynamicHeader'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    fetchBoardList,
    fetchBoard,
    destroyBoard,
    fetchThread,
    updateMonitoredThread,
    monitorThread,
    unmonitorThread,
} from '~/redux/actions';

import {
  getIsBoardFetching,
  getBoardID,
  getThreadID,
  getBoardStatistics
} from "~/redux/selectors";

function mapStateToProps(state) {
    return {
        boardID: getBoardID(state),
        threadID: getThreadID(state),
        boardIsFetching: getIsBoardFetching(state),
        boardStats: getBoardStatistics(state),

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
        destroyBoard,
        fetchThread,
        updateMonitoredThread,
        monitorThread,
        unmonitorThread,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DynamicHeader)
