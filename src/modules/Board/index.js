import Board from './Board';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    fetchBoard,
    loadMorePosts,
    scrollHeader,
    fetchThread
} from '~/redux/actions';

import {
    getBoardPosts,
    getBoardPostsBySearch,
    getBoardPostsByFilter,
    isBoardFetching,
    isBoardBeingSearched,
    isBoardFiltered,
    getBoardID
} from '~/redux/selectors'

function mapStateToProps(state) {
    return {
        boardID: getBoardID(state),
        posts: getBoardPosts(state),
        postsBySearchTerm: getBoardPostsBySearch(state),
        postsByFilterTerm: getBoardPostsByFilter(state),
        isBeingSearched: isBoardBeingSearched(state),
        isFiltered: isBoardFiltered(state)
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
