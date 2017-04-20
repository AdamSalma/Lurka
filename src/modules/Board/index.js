import Board from './Board'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    fetchBoard,
    loadMorePosts,
    scrollHeader,
    fetchThread
} from '~/redux/actions';

function mapStateToProps({ status, display, board, thread }) {
    return {
        status,
        board,
        isAppReady:   display.isAppReady,
        isDrawerOpen: display.isDrawerOpen,
        isThreadOpen: display.isThreadOpen
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchBoard,
        fetchThread,
        loadMorePosts,
        scrollHeader
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Board)
