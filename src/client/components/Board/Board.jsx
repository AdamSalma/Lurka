import React, { Component } from "react";

import '../../vendor';

import BoardPost from '../BoardPost';
import { catchTooltip } from './events';
import createLayout from './layout';

export default class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            incrementAmount: 10
        }

        this.onThreadFetch = this.onThreadFetch.bind(this)
        this.incrementBoardLimit = this.incrementBoardLimit.bind(this)
    }
    
    componentWillMount() {
        if (!this.props.board.posts.length) {
            const { boardID, provider } = this.props
            this.props.fetchBoard({ provider, boardID });
        }
    }

    componentDidMount() {
        const { board } = this.refs
        const { incrementLimit } = this.props
        const $board = $(board)

        // Board scroller
        $board.nanoScroller({ sliderMaxHeight: 400, sliderMinHeight: 60 })

        // Hover over board posts reveals more info
        createLayout()
        catchTooltip(board);  // TODO: Implement catchtooltip on board

        $board.on('scrollend', this.incrementBoardLimit)
    }


    componentDidUpdate({ board }) {
        if (board.posts.length !== this.props.board.posts.length) {
            createLayout()
            const $board = $(this.refs.board)
            $board.nanoScroller()
            $board.on('scrollend', this.incrementBoardLimit)
        }
    }

    // shouldComponentUpdate({ board: newboard }) {
    //     return this.props.board.posts.length !== newboard.posts.length
    // }

    componentWillUnmount() {
        $(this.refs.board).off('hover scrollend');
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

    incrementBoardLimit() {
        const { incrementLimit, board } = this.props
        const newValue = this.props.board.limit + this.state.incrementAmount
        console.log('End of board. newValue:' + newValue)
        incrementLimit(newValue)
        this.forceUpdate()
    
    }

    createThreads() {
        const { posts, limit } = this.props.board;
        console.warn(`board limit: ${limit}`)
        return posts.slice(0, limit).map( post => {
            return (
                <BoardPost
                    key={post.id}
                    post={post} 
                    fetchThread={this.onThreadFetch}
                    reshuffle={createLayout}
                />
            );
        });
    }

    onThreadFetch( threadID ){
        const { provider, boardID, fetchThread } = this.props;
        $('.thread-wrap').nanoScroller({ stop: true })
        fetchThread(provider, boardID, threadID);
    }
}