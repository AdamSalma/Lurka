import React, { Component, PropTypes } from "react";

import '../../vendor';

import BoardPost from '../BoardPost';
import { catchTooltip } from './events';
import createLayout from './layout';

var didScroll = false

export default class Board extends Component {
    constructor({ board, boardID, provider, fetchBoard }) {
        super();
        this.state = {
            load: 20,
            scrollThrottle: 333,  // ms
            headerHeight: 60,  // Beware if header height changes
            canLoadMorePosts: true,
            preLoadMoreAt: 1500 // px from bottom
        }

        this.onBoardPostClick = this.onBoardPostClick.bind(this)
        this.loadMorePosts    = this.loadMorePosts.bind(this)
        this.checkIfScrolled  = this.checkIfScrolled.bind(this)

        this.previousScrollTop = 0
        this.limiter = 12
        this._interval = setInterval(this.checkIfScrolled, this.state.scrollThrottle)

    }


    componentDidMount() {
        // Board scroller
        this._board.nanoScroller({ sliderMaxHeight: 400, sliderMinHeight: 60 })

        // Hover over board posts reveals more info
        $(window).resize(createLayout)
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
        return (
            <div id="board" className="board nano" ref={ b => this._board = $(b)} >
                <div className="nano-content" ref="content">
                    <div className="header-gap"/>
                    <div className="posts" ref="posts">
                        {this.createPosts()}
                    </div>
                </div>
            </div>
        );
    }

    createPosts() {
        const posts = this.getPosts()
        return posts.map( (post, index) => {
            if (index+1 === posts.length) {
                // last post
                return (
                    <BoardPost
                        key={post.id}
                        post={post} 
                        fetchThread={this.onBoardPostClick}
                        reshuffle={() => {
                            // loads more posts after rendering
                            createLayout()
                            this.loadMorePosts()
                        }}
                    />
                )
            }
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

    getPosts() {
        const { posts, limit, searchWord, filterWords } = this.props.board;
        console.warn(posts)
        let _posts 

        if (searchWord) {
            // search posts for word
            _posts = posts.filter( ({ title="", comment="" }) => {
                return (
                    title.toLowerCase().includes(searchWord) || 
                    comment.toLowerCase().includes(searchWord)
                )
            })
            setTimeout(()=>{
                // Reshuffle posts and scroll to top of container
                createLayout()
                this._board.nanoScroller({ scroll:"top" })
            }, 333)

        } else if (filterWords.length) {
            // filter posts that include any unwanted words
            _posts = filterWords.map( unwanted => {
                return posts.filter( ({ title="", comment="" }) => {
                    return !(
                        title.toLowerCase().includes(unwanted) ||
                        comment.toLowerCase().includes(unwanted)
                    )
                })
            })

        } else {
            _posts = posts
        }

        return _posts.slice(0, limit)
    }

    loadMorePosts() {
        const { loadMorePosts, board } = this.props
        const newValue = board.limit + this.state.load
        loadMorePosts(newValue)    
    }


    onBoardPostClick( threadID ){
        // Fetch if user not highlighting any text
        if (!window.getSelection().toString()) {
            const { provider, boardID, fetchThread, scrollHeader } = this.props;
            // Hide Thread scrollbar
            $('.thread-wrap').nanoScroller({ stop: true })  
            fetchThread(provider, boardID, threadID);
            scrollHeader(true)  // make header visible
        }
    }
}



Board.propTypes = {
    board: PropTypes.shape({
        posts: PropTypes.array
    })
}
