import React from 'react';
import uuid from "uuid";

import BoardPost from '../BoardPost';
import { catchTooltip } from './events';

export default class Board extends React.Component {
    constructor(){
        super()
        this.onThreadFetch = this.onThreadFetch.bind(this);
    }
    componentWillMount() {
        if (!this.props.board.items.length) {
            const { boardID, provider } = this.props
            this.props.fetchBoard({
                provider: provider,
                boardID: boardID
            });
        }
    }

    componentDidMount() {
        catchTooltip(this.refs.board);
    }

    componentWillUnmount() {
        $(this.refs.board).off('hover');
    }

    createThreads() {
        const { board, viewType } = this.props;
        var counter = 0;
        return board.items.map( thread => {
            if (counter>=50) return;
            counter++
            return (
                <BoardPost
                    key={uuid.v4()}
                    post={thread} 
                    fetchThread={this.onThreadFetch}
                />
            );
        });
    }

    render() {
        return (
            <div id="board" className="board">
                {this.createThreads()}
            </div>
        );
    }

    onThreadFetch( threadID ){
        const { provider, boardID, fetchThread } = this.props;

        fetchThread(provider, boardID, threadID);
    }
}