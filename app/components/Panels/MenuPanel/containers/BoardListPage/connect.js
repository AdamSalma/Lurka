import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    getBoardListItems,
    getFavouriteBoards
} from '~/redux/selectors';

import {
    fetchBoard,
    addBoardToFavourites,
    removeBoardFromFavourites
} from '~/redux/actions'


function mapStateToProps(state) {
    return {
        boardList: getBoardListItems(state),
        favourites: getFavouriteBoards(state)
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchBoard,
        addBoardToFavourites,
        removeBoardFromFavourites
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)
