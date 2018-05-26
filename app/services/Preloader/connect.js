import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
    fetchBoard,
    fetchBoardList,
} from '~/redux/actions';

function mapStateToProps({boardList, board, settings}) {
    return {
        board,
        boardList,
        defaultBoard: settings.homeBoard
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchBoardList,
        fetchBoard,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps);
