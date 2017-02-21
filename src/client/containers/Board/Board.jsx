import React, { Component, PropTypes } from "react";
import classNames from 'classnames'

import BoardPost from '../BoardPost';
import { catchTooltip } from './events';
import createLayout from './layout';

var didScroll = false

export default class Board extends Component {
    constructor({ board, boardID, provider, fetchBoard }) {
        super();
        this.state = {
            load: 25,
            scrollThrottle: 333,  // ms
            headerHeight: 60,  // Beware if header height changes
            canLoadMorePosts: true,
            preLoadMoreAt: 1500 // px from bottom
        }

        this.nanoOpts = { 
            sliderMaxHeight: 400,
            sliderMinHeight: 50
        }

        this.onBoardPostClick = this.onBoardPostClick.bind(this)
        this.loadMorePosts    = this.loadMorePosts.bind(this)
        this.throttleScroll   = this.throttleScroll.bind(this)

        this.previousScrollTop = 0

        this._throttled = 12
        this._itemsRemainInView = true
    }


    componentDidMount() {
        // Board scroller
        this._board.nanoScroller(this.nanoOpts)

        // Hover over board posts reveals more info
        $(window).resize(createLayout)
        catchTooltip(board);  // TODO: Implement catchtooltip on board
    }

    componentDidUpdate({ board, boardID }) {
        if (board.posts.length !== this.props.board.posts.length) {
            createLayout()
            this._board.nanoScroller()
            this._board.trigger('scroll')
            this._board.bind('scrollend', () => {
                this._itemsRemainInView = false
            })
        }

        if (this.props.boardID != boardID) {
            this._itemsRemainInView = true
        }

        if (this._itemsRemainInView) {
            this.checkItemsInView()
        }
    }

    componentWillUnmount() {
        this._board.off();
    }

    render() {
        const boardClasses = classNames('board nano', {
            'show-all': this.props.board.searchWord
        })

        return (
            <div id="board" className={boardClasses} ref={ b => this._board = $(b)} onScroll={this.throttleScroll}>
                <div className="nano-content">
                    <div className="header-gap"/>
                    <div className="posts" ref={p => this._posts = p}>
                        {this.createPosts()}
                    </div>
                </div>
            </div>
        );
    }

    throttleScroll(e) {
        if (this._throttled >= 12 && this._itemsRemainInView) {
            this._throttled = 0
            console.warn("checking!");
            this.trackScroll(e.target)
        }
        this._throttled += 1
    }

    trackScroll({ scrollTop, scrollHeight }) {
        this.checkItemsInView()

        if (scrollTop + window.innerHeight + 600 > scrollHeight ) {
            this.loadMorePosts()
        }
    }

    checkItemsInView(){
        const winHeight = window.innerHeight + 200
        $.each(this._posts.children, function(index, element) {
            if (element.getBoundingClientRect().bottom <= winHeight) {
                element.classList.add('animate')
            }
        })
    }

    createPosts() {
        const posts = this.getPosts()
        return posts.map( (post, index) => {
            let id = post.id
            return (
                <BoardPost
                    key={id}
                    post={post} 
                    onClick={this.onBoardPostClick.bind(null, id)}
                    onLoad={createLayout}
                />
            );
        });
    }

    getPosts() {
        const { posts, limit, searchWord, filterWords } = this.props.board;
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
            }, 300)

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

        return _posts
    }

    loadMorePosts() {
        const { loadMorePosts, board } = this.props
        const newValue = board.limit + this.state.load
        
        loadMorePosts(newValue)    
    }


    onBoardPostClick( threadID ){
        // Fetch if user not highlighting any text
        if (!window.getSelection().toString()) {
            const { boardID, fetchThread, scrollHeader } = this.props;

            fetchThread(boardID, threadID);
            
            // Hide Thread scrollbar
            $('.thread-wrap').nanoScroller({ stop: true })  
        }
    }
}



Board.propTypes = {
    board: PropTypes.shape({
        posts: PropTypes.array
    })
}
