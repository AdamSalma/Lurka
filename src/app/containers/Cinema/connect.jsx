import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    toggleCinema,
    cycleCinemaTimeline
} from '~/redux/actions';

import {
    getBoardID,
    getBoardPosts,
    getBoardPostsBySearch,
    getBoardPostsByFilter,
    getBoardStatistics,
    isBoardBeingSearched,
    isBoardFetching,
    isBoardFiltered,
} from '~/redux/selectors'

function mapStateToProps(state) {
    return {
        isActive: state.cinema.isActive,
        timeline: state.cinema.entities.timeline
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        toggleCinema,
        cycleCinemaTimeline
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
