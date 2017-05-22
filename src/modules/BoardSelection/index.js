import BoardSelection from './BoardSelection';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    fetchBoard,
    addBoardToFavourites,
    destroyBoard
} from '~/redux/actions';

function mapStateToProps({ boardList, status }) {
    return {
        boardList,
        currentBoard: status.boardID
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchBoard,
        addBoardToFavourites,
        destroyBoard
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(BoardSelection)
