import React, {Component} from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import updatePreloader from '~/preload'
import { fetchBoard, fetchBoardList, appReady } from '~/redux/actions';

import Views from '~/views'


class Preloader extends Component {
    constructor(props) {
        super();
        updatePreloader()  // if loaded from localStorage
        this.fetchInitialContent(props)
    }

    componentDidUpdate() {
        updatePreloader()
    }

    render() {
        // TODO: Multipage application
        // this.props.instances


        // Temp until multipage
        return false
    }

    fetchInitialContent(props) {
        const {board, boardList, fetchBoard, fetchBoardList, provider, homeBoard} = props;

        if (!boardList[provider] || !boardList[provider].length) {
            fetchBoardList(provider)
        }

        if (!board.posts.length && !board.isFetching) {
            console.warn("Homeboard is ", homeBoard)
            fetchBoard({boardID: homeBoard})
        }
    }
}

function mapStateToProps({status, boardList, board, settings}) {
    return {
        provider: status.provider,
        homeBoard: settings.homeBoard.value,
        boardList,
        board
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchBoardList,
        fetchBoard
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Preloader)
