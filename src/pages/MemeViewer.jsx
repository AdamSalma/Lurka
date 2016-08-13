import React from "react";
import Axios from "axios";

import Board from "../components/Board";
import Thread from "../components/Thread";
import Background from "../components/Background";
import Spinner from "../components/Spinner";


export default class MemeViewer extends React.Component {
    constructor(props) {
        super(props);

        this.requestBoard = this.requestBoard.bind(this);
        this.onThreadRequest = this.onThreadRequest.bind(this);
        this.onThreadClose = this.onThreadClose.bind(this);

        window.customLOL = this.toggleBackground

        this.state = {
            provider: "chan",
            threads: [],
            thread: [],
            boardID: "g",
            atTop: true,
            isThreadLoading: false,
            isBackgroundOn: false,
            isSpinnerOn: false
        }
    }

    componentWillMount() {
        if (!this.state.threads.length) this.requestBoard('g');
    }

    componentWillUpdate() {
        if (this.state.isThreadLoading) this.toggleLoading()
    }

    componentDidMount() {
        console.log(document)
    }
    render() {
        window.memeState = this.state
        const { thread, threads, provider, atTop, isSpinnerOn, isBackgroundOn } = this.state;
        return (
            <div ref="board" className={"board " + provider}>
                <Board
                    threads={threads}
                    onThreadRequest={this.onThreadRequest}/>
                <Thread
                    thread={thread}/>
                <Spinner
                    isSpinning={isSpinnerOn}/>
                <Background
                    isVisible={isBackgroundOn}
                    onThreadClose={this.onThreadClose}/>
            </div>

        )
    }

    requestBoard( boardID ) {
        const { provider } = this.state;
        Axios.get(`/${provider}/${boardID}`).then( board => {
            console.log("Board success!");
            console.log(board);
            this.setState({
                boardID: boardID,
                threads: board.data
            });
        })
    }

    onThreadRequest( threadID ) {
        console.log(`getting thread ${threadID}`)
        const { provider, boardID } = this.state;
        Axios.get(`/${provider}/${boardID}/${threadID}`).then( thread => {
            console.log("Thread success!");
            console.log(thread);
            this.setState({
                thread: board.data,
                isThreadLoading: true
            });
        })
    }

    onThreadClose() {
        this.setState({
            isThreadLoading: false
        })
    }

    toggleLoading( spinner, background ) {
        const { isSpinnerOn, isBackgroundOn } = this.state;
        this.setState({
            isSpinnerOn: spinner || !isSpinnerOn,
            isBackgroundOn: background || !isBackgroundOn
        });
    }
}
