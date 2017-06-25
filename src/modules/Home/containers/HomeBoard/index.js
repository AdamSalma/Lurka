import HomeBoard from './HomeBoard';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    getBoardID,
    getHomeBoard,
    getBoardsOrderedAlphabetically,
    getFavouriteBoards
} from '~/redux/selectors';

import {
    fetchBoard,
    addBoardToFavourites,
    removeBoardFromFavourites
} from '~/redux/actions';


function mapStateToProps(state) {
    return {
        currentBoard: getBoardID(state),
        homeBoard: getHomeBoard(state),
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchBoard,

    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeBoard);
