import React, { Component } from "react";

import '../../vendor';

import BoardPost from '../BoardPost';
import { catchTooltip } from './events';

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.onThreadFetch = this.onThreadFetch.bind(this)
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
        const { board } = this.refs

        // Board scroller
        $(board).nanoScroller({ sliderMaxHeight: 120, sliderMinHeight: 60 })

        // Hover over board posts reveals more info
        catchTooltip(board);  // TODO - Implement this
    }

    componentWillUnmount() {
        $(this.refs.board).off('hover');
    }


    render() {
        return (
            <div id="board" className="board nano" ref='board'>
                <div className="nano-content">
                    {this.createThreads()}
                </div>
            </div>
        );
    }

    createThreads() {
        const { board, viewType } = this.props;
        var counter = 0;
        return board.items.map( post => {
            if (counter>=50) return;
            counter++
            return (
                <BoardPost
                    key={post.id}
                    post={post} 
                    fetchThread={this.onThreadFetch}
                />
            );
        });
    }

    onThreadFetch( threadID ){
        const { provider, boardID, fetchThread } = this.props;
        fetchThread(provider, boardID, threadID);
    }
}