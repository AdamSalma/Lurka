import BoardSearch from './BoardSearch';

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
        orderedBoards: getBoardsOrderedAlphabetically(state)
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchBoard,
        addBoardToFavourites,
        removeBoardFromFavourites
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardSearch);
