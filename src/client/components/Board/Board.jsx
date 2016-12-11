import React, { Component } from "react";

import '../../vendor';

import BoardPost from '../BoardPost';
import { catchTooltip } from './events';
import createLayout from './layout';

export default class Board extends Component {
    constructor({ board, boardID, provider, fetchBoard }) {
        super();
        this.state = {
            incrementPostsBy: 15,
            scrollThrottle: 250,  // ms
            headerHeight: 60,  // Beware if header height changes
            canLoadMorePosts: true,
            preLoadMoreAt: 300 // px from bottom
        }

        this.onBoardPostClick = this.onBoardPostClick.bind(this)
        this.loadMorePosts = this.loadMorePosts.bind(this)

        this.handleScroll = this.handleScroll.bind(this)
        this.checkIfScrolled = this.checkIfScrolled.bind(this)

        this.previousScrollTop = 0
        this.didScroll = false
        this.limiter = 12
        this._interval = setInterval(this.checkIfScrolled, this.state.scrollThrottle)

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
    }

    componentDidUpdate({ board }) {
        if (board.posts.length !== this.props.board.posts.length) {
            createLayout()
            const $board = $(this.refs.board)
            $board.nanoScroller()
        }
    }

    componentWillUnmount() {
        clearInterval(this._interval)
        $(this.refs.board).off('hover');
    }

    render() {
        const {provider, boardID} = this.props
        return (
            <div id="board" className="board nano" ref='board' onScroll={()=>{this.didScroll = true}}>
                <div className="nano-content" ref="content">
                    <div className="board-header">
                        <h1>{`${provider}: /${boardID}/`}</h1>
                    </div>
                    <div className="posts" ref="posts">
                        {this.createThreads()}
                    </div>
                </div>
            </div>
        );
    }

    createThreads() {
        const { posts, limit } = this.props.board;
        return posts.slice(0, limit).map( post => {
            return (
                <BoardPost
                    key={post.id}
                    post={post} 
                    fetchThread={this.onBoardPostClick}
                    reshuffle={createLayout}
                />
            );
        });
    }
    
    loadMorePosts() {
        const { incrementLimit, board } = this.props
        const newValue = this.props.board.limit + this.state.incrementPostsBy
        incrementLimit(newValue)    
    }


    onBoardPostClick( threadID ){
        // Fetch if user not highlighting any text
        if (!window.getSelection().toString()) {
            const { provider, boardID, fetchThread } = this.props;
            $('.thread-wrap').nanoScroller({ stop: true })  // hide scrollbar on thread 
            fetchThread(provider, boardID, threadID);
        }
    }

    checkIfScrolled(event) {
        if (this.didScroll) {
            this.handleScroll(event)
            this.didScroll = false
        }
    }

    handleScroll() {
        // Check scroll position and toggle header accordingly

        const 
            {scrollTop, scrollHeight} = this.refs.content,
            {headerHeight, canLoadMorePosts, preLoadMoreAt} = this.state, 
            canShowHeader = !(scrollTop > this.previousScrollTop && scrollTop > headerHeight),
            closeToBottom = scrollTop+window.innerHeight > (scrollHeight - preLoadMoreAt);

        console.log(`scrollTop: ${scrollTop}, scrolled down: ${scrollTop > this.previousScrollTop}`)
        this.props.scrollHeader(canShowHeader, 0);
        this.previousScrollTop = scrollTop

        console.info(`scrollHeight: ${scrollHeight} contentHeight: ${scrollTop+window.innerHeight}, closeToBottom: ${closeToBottom}`)

        if (closeToBottom && canLoadMorePosts) {
            // throttle posts
            this.setState({canLoadMorePosts: false})
            this.loadMorePosts()
            setTimeout(() => this.setState({canLoadMorePosts: true}), 2000)
            
        }

    }
}
