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

import { bindMembersToClass } from '~/utils'

class Preloader extends Component {
    constructor(props) {
        super();
        this.preloading = true
        bindMembersToClass(this, 'updatePreloader', 'onPreloadComplete')
        this.checkPreloadProgress = createPreloader(this.onPreloadComplete)
        fetchInitialContent(props)
        this.updatePreloader(props)  // loaded from localStorage
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.warn("shouldComponentUpdate(): " + this.preloading)
        return this.preloading
    }

    componentDidUpdate() {
        this.updatePreloader()
    }

    render() { return false }

    onPreloadComplete() {
        console.warn("Preloaded!")
        this.preloading = false
    }

    updatePreloader(props=false) {
        console.log("updatePreloader:", this)
        this.checkPreloadProgress(props || this.props)
    }


}

function mapStateToProps({status, boardList, board, settings}) {
    return {
        boardList, board,
        homeBoard: settings.external.homeBoard,
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
