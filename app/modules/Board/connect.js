import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    fetchBoard,
    loadMorePosts,
    scrollHeader,
    fetchThread,
    searchBoard,
    sortBoard,
    addBoardToFavourites,
    removeBoardFromFavourites
} from '~/redux/actions';

import {
    getBoardID,
    getBoardPosts,
    getBoardPostsBySearch,
    getBoardPostsByFilter,
    getBoardStatistics,
    getCurrentBoardInfo,
    isBoardBeingSearched,
    isBoardFetching,
    isBoardFiltered,
    getBoardSortBy,
    getCurrentBoardIsFavourite
} from '~/redux/selectors'

function mapStateToProps(state) {
    return {
        boardID: getBoardID(state),
        currentBoard: getCurrentBoardInfo(state),
        posts: getBoardPosts(state),
        postsBySearchTerm: getBoardPostsBySearch(state),
        postsByFilterTerm: getBoardPostsByFilter(state),
        isBeingSearched: isBoardBeingSearched(state),
        isFiltered: isBoardFiltered(state),
        isFetching: isBoardFetching(state),
        statistics: getBoardStatistics(state),
        sortBy: getBoardSortBy(state),
        isFavourite: getCurrentBoardIsFavourite(state)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchBoard,
        fetchThread,
        loadMorePosts,
        scrollHeader,
        searchBoard,
        addBoardToFavourites,
        removeBoardFromFavourites,
        onSort: sortBoard
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
