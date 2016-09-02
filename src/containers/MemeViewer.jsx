import React from "react";
import Board from "../components/Board";
import Thread from "../components/Thread";
import Background from "../components/Background";
import Spinner from "../components/Spinner";


export default class MemeViewer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            provider: "chan",
            isBackgroundOn: false,
            isSpinnerOn: false
        }
    }

    render() {
        const { provider, isSpinnerOn, isBackgroundOn } = this.state;
        return (
            <div ref="board" className={"board " + provider}>
                <Board />
                <Thread />
                <Spinner
                    isSpinning={isSpinnerOn}/>
                <Background
                    isVisible={isBackgroundOn}/>
            </div>
        )
    }
}
