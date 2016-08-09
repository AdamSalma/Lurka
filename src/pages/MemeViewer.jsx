import React from "react";

import Board from "../components/Board";
import Thread from "../components/Thread";

export default class MemeViewer extends React.Component {
    constructor(props) {
        super(props);

        this.requestBoard.bind(this);
        this.onThreadRequest.bind(this);

        this.state = {
            provider: "4chan",
            threads: {},
            thread: {},
            board: "g"
        }
    }

    render() {
        const { provider, thread, threads } = this.state;
        return (
            <div className={provider}>
                <button onClick={this.requestBoard.bind(null, "g")}>

                </button>
                <Board threads={ threads } onThreadRequest={this.onThreadRequest}/>
                <Thread thread={ thread }/>
            </div>
        )
    }

    requestBoard( boardID ) {
        const { provider } = this.props;
        axios.get(`/${provider}/${boardID}`).then( board => {
            console.log("Board success!");
            console.log(board);
            this.setState({
                boardID: boardID,
                threads: board.data
            });
        }).catch( err => console.error(err) );
    }

    onThreadRequest( threadID ) {
        const { provider, boardID } = this.state;
        axios.get(`/${provider}/${boardID}/${threadID}`).then( thread => {
            console.log("Thread success!");
            console.log(thread);
        }).catch( err => console.error(err) );
    }
}
