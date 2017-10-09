import React from 'react'

import connect from './connect'
import { ServiceComponent } from '~/components'
import {onAppReady, emitAppReady} from '~/events';


export class Preloader extends ServiceComponent {
    isPreloading = true;

    get isOnline() {
        // Navigator will always be available because we are
        // targeting electron + chrome
        return window.navigator.onLine;
    }

    constructor(props) {
        super(props);
        // this.checkPreloadProgress = createPreloader()

        if (this.isOnline) {
            this.fetchInitialContent(props)
        } else {
            console.error("App is offline");
            // dispatch alert: "No internet connection"
        }
    }

    shouldComponentUpdate = () => this.isPreloading;

    componentDidUpdate() {
        // this.updatePreloader()
        if (this.didPreloadComplete()) {
            this.onPreloadComplete();
        }
    }

    fetchInitialContent ({ boardList, board, defaultBoard, fetchBoard, fetchBoardList }) {
        if (!boardList.items.length) {
            fetchBoardList()
        }

        if (!board.posts.length && !board.isFetching) {
            fetchBoard(defaultBoard)
        }
    }

    didPreloadComplete() {
        return this.props.board.posts.length &&
               this.props.boardList.items.length
    }

    onPreloadComplete() {
        this.isPreloading = false;
        emitAppReady(this.isOnline);
    }

}

export default connect(Preloader);
