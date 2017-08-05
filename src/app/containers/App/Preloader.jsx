import React, { Component } from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import {
    createPreloader,
    fetchInitialContent
} from './preload'

import {
    fetchBoard,
    fetchBoardList,
} from '~/redux/actions';

import { bindMembersToClass } from '~/utils/react'
import {onAppReady} from '~/events/subscribers';


class Preloader extends Component {
    constructor(props) {
        super();
        this.preloading = true
        this.checkPreloadProgress = createPreloader()
        fetchInitialContent(props)
        this.updatePreloader(props)  // loaded from localStorage
    }

    shouldComponentUpdate(nextProps, nextState) {
        return this.preloading
    }

    componentDidUpdate() {
        this.updatePreloader()
    }

    render() { return null }

    updatePreloader = (props=false) => {
        console.log("updatePreloader:", this)
        this.checkPreloadProgress(props || this.props)
    }

    @onAppReady
    onAppReady() {
        this.preloading = false
    }

}

function mapStateToProps({status, boardList, board, settings}) {
    return {
        boardList, board,
        homeBoard: settings.homeBoard,
        alertMessage: status.alertMessage,
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        fetchBoardList,
        fetchBoard,
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Preloader)
