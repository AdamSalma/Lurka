import React, { Component } from "react";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/* Conainers */
import BoardPage from './BoardPage';
import ThreadPage from './ThreadPage';
import SettingsPage from './SettingsPage';
import GlobalPage from './GlobalPage';

/* Actions */
import { fetchBoard } from '../actions/BoardActions';
import { fetchBoardList } from '../actions/BoardListActions';

import updatePreloader from '../preload'


const App = () => {
    return (
        <div id="pages">
            <BoardPage/>
            <ThreadPage/>
            <SettingsPage/>
            <GlobalPage/>
    	</div>
    )
}

class AppContainer extends Component {
    constructor(props) {
        super();
        this.fetchInitialContent(props)
    }

    componentDidUpdate() {
        updatePreloader()
    }

    render() {
        // TODO: Multipage application
        // this.props.instances
        

        // Temp until multipage
        return <App />
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

export default connect(mapStateToProps, mapDispatchToProps)(AppContainer)
