import React, { Component } from "react";

import '../../vendor';

import BoardPost from '../BoardPost';
import { catchTooltip } from './events';
import createLayout from './layout';

var didScroll = false

export default class Board extends Component {
    constructor({ board, boardID, provider, fetchBoard }) {
        super();
        this.state = {
            incrementPostsBy: 20,
            scrollThrottle: 333,  // ms
            headerHeight: 60,  // Beware if header height changes
            canLoadMorePosts: true,
            preLoadMoreAt: 500 // px from bottom
        }

        this.onBoardPostClick = this.onBoardPostClick.bind(this)
        this.loadMorePosts = this.loadMorePosts.bind(this)

        this.handleScroll = this.handleScroll.bind(this)
        this.checkIfScrolled = this.checkIfScrolled.bind(this)

        this.previousScrollTop = 0
        this.limiter = 12
        this._interval = setInterval(this.checkIfScrolled, this.state.scrollThrottle)

    }


    componentDidMount() {
        const { incrementLimit } = this.props

        // Board scroller
        this._board.nanoScroller({ sliderMaxHeight: 400, sliderMinHeight: 60 })

        // Hover over board posts reveals more info
        createLayout()
        catchTooltip(board);  // TODO: Implement catchtooltip on board
    }

    componentDidUpdate({ board }) {
        if (board.posts.length !== this.props.board.posts.length) {
            createLayout()
            this._board.nanoScroller()
        }
    }

    componentWillUnmount() {
        clearInterval(this._interval)
        this._board.off();
    }

    render() {
        const {provider, boardID, board} = this.props
        return (
            <div id="board" className="board nano" 
                 ref={ board => this._board = $(board)} 
                 onScroll={() => didScroll = true}
            >
                <div className="nano-content" ref="content">
                    <div className="board-header">
                        <h1>{`${provider}: /${boardID}/`}</h1>
                    </div>
                    <div className="posts" ref="posts">
                        {this.createPosts()}
                    </div>
                </div>
            </div>
        );
    }

    createPosts() {
        const { posts, limit, filterWord } = this.props.board;
        let _posts 

        if (filterWord) {
            _posts = posts.filter(({title="", comment=""}) => {
                return title.toLowerCase().includes(filterWord) || 
                       comment.toLowerCase().includes(filterWord)
            })
            setTimeout(()=>{
                // Reshuffle posts and scroll to top of container
                createLayout()
                this._board.nanoScroller({ scroll:"top" })
            }, 333)
        } else {
            _posts = posts.slice(0, limit)
        }

        return _posts.map( post => {
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
        const newValue = board.limit + this.state.incrementPostsBy
        incrementLimit(newValue)    
    }


    onBoardPostClick( threadID ){
        // Fetch if user not highlighting any text
        if (!window.getSelection().toString()) {
            const { provider, boardID, fetchThread } = this.props;
            // Hide Thread scrollbar
            $('.thread-wrap').nanoScroller({ stop: true })  
            fetchThread(provider, boardID, threadID);
        }
    }

    checkIfScrolled(event) {
        if (didScroll) {
            this.handleScroll(event)
            didScroll = false
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
