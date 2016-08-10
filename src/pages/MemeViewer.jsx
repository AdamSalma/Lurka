import React from "react";
import Axios from "axios";

import Board from "../components/Board";
import Thread from "../components/Thread";


export default class MemeViewer extends React.Component {
    constructor(props) {
        super(props);

        this.requestBoard.bind(this);
        // this.onThreadRequest.bind(this);

        this.state = {
            provider: "4chan",
            threads: [],
            thread: [],
            board: "g"
        }
    }

    componentWillMount() {
        this.requestBoard('g');
    }

    render() {
        const { provider, threads, thread } = this.state;
        return (
            <div ref="board" className={"board " + provider}>
                <Board threads={ threads } onThreadRequest={this.onThreadRequest}/>
                <Thread thread={ thread }/>
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
        }).catch( err => console.error(err) );
    }

    onThreadRequest( threadID ) {
        console.log(`getting thread ${threadID}`)
        const { provider, boardID } = this.state;
        Axios.get(`/${provider}/${boardID}/${threadID}`).then( thread => {
            console.log("Thread success!");
            console.log(thread);
        }).catch( err => console.error(err) );
    }
}
