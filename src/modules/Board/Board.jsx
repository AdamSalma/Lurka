import './Board.styles';
import React, { Component, PropTypes } from "react";
import classes from 'classnames';

import BoardPost from './BoardPost';
import SideIconGroup from './components/SideIconGroup';
import BoardStats from './components/BoardStats';
import {Icon, Circle, Tooltip} from '~/components';

import createLayout from './layout';
import { onAppReady, onDrawerToggle } from '~/events/subscribers';
import {
    emitThreadOpen,
    emitSubHeaderToggle
} from '~/events/publishers';

import { bindMembersToClass } from '~/utils/react'
import {
    throttleByCount,
    invokeAfterUninterruptedDelay
} from '~/utils/throttle';

const settings = window.appSettings


export default class Board extends Component {
    static propTypes = {
        board: PropTypes.shape({
            posts: PropTypes.array
        })
    }

    constructor(props) {
        super(props);

        this.state = {
            load: 25,
            headerHeight: settings.headerHeight,  // Beware if header height changes
            scrollTop: 0,
            isDrawerOpen: props.isDrawerOpen
        }

        bindMembersToClass(this,
            'handlePostClick',
            'loadMorePosts',
            'checkPostsInView',
            'handleScroll'
        )

        this._onScroll = throttleByCount(10, this.handleScroll);
        this.previousScrollTop = 0

        this.layoutProps = {
            targetSelector: '.BoardPost',
            containerSelector: '#board',
            margin: settings.boardPostMargin,
            gutterLeft: settings.boardOuterMargin,
            gutterRight: settings.boardOuterMargin,
            gutterTop: 100
        }

        this.layoutPropsForDrawer = Object.assign({}, this.layoutProps, {
            gutterRight: settings.drawerWidth + settings.boardOuterMargin
        })

        this.applyLayout = createLayout(props.isDrawerOpen
            ? this.layoutPropsForDrawer
            : this.layoutProps
        )

        this.nanoOpts = {
            sliderMaxHeight: 400,
            sliderMinHeight: 50
        }
    }


    componentDidMount() {
        // Board scroller
        this._board.nanoScroller(this.nanoOpts)

        const onWindowResize =
            // Must be in callback because this.applyLayout changes
            invokeAfterUninterruptedDelay(50, () => this.applyLayout())

        $(window).resize(onWindowResize)

        // Hover over board posts reveals more info
        // catchTooltip(board);  // TODO: Implement catchtooltip on board
    }

    componentDidUpdate({ board }) {
        if (board.posts.length !== this.props.board.posts.length) {
            this.onPostsChange();
        }
    }

    componentWillUnmount() {
        this._board.off();
    }

    render() {
        const boardClasses = classes('Board', 'nano', {
            'show-all': this.props.board.searchWord,
            'disable-animations': this.props.isThreadOpen,
            'move-scrollbar': this.props.isDrawerOpen
        })

                        // <BoardStats
                        //     posts={this.props.posts && this.props.posts.length}
                        //     images={this.props.imageCount}
                        //     replies={this.props.replyCount}
                        //     boardName={this.props.boardName}
                        // />
        return (
            <div id="board" className={boardClasses} ref={b => this._board = $(b)}>
                <div className="nano-content" onScroll={this._onScroll}>
                    <div className="header-gap"/>
                    <div className="posts" ref={x => this._postContainer = x}>
                        {this.renderPosts()}
                    </div>
                </div>
            </div>
        );
    }

    // updateScrollTop({ scrollTop, scrollHeight }) {
    //     this.setState({
    //         scrollTop,
    //         threadHeight: scrollHeight,
    //     })
    // }

    @onAppReady
    onAppReady() {
        this.checkPostsInView()
    }

    @onDrawerToggle
    onDrawerToggle(isOpen) {
        this.applyLayout = createLayout(
            isOpen
                ? this.layoutPropsForDrawer
                : this.layoutProps
        )
        this.applyLayout()
        setTimeout(this.checkPostsInView, 400);
    }

    onPostsChange() {
        this.resetBoard();
        setTimeout(this.checkPostsInView, 500)
    }

    handleScroll(e) {
        e.stopPropagation();

        this.checkPostsInView();

        // Condition overrides toggle
        emitSubHeaderToggle(e.target.scrollTop < this.previousScrollTop);

        this.previousScrollTop = e.target.scrollTop;
    }

    checkPostsInView() {
        console.info("BOARD::checkPostsInView")
        if (!this._postContainer)
            return

        const toloratedHeight = window.innerHeight + 250;
        $.each(this._postContainer.children, function(index, element) {
            if (element.getBoundingClientRect().bottom <= toloratedHeight) {
                element.classList.add('animate');
            }
        })
    }

    renderPosts() {

        return this.getPosts().map( (post, index) => {
            let id = post.id
            return (
                <BoardPost
                    key={id}
                    post={post}
                    onClick={this.handlePostClick.bind(null, id)}
                    onLoad={this.applyLayout}
                />
            );
        });
    }

    getPosts() {
        const { posts, searchWord, filterWords } = this.props.board;
        let _posts

        if (searchWord) {
            // search posts for word
            _posts = posts.filter( ({ title="", comment="" }) => {
                return (
                    title.toLowerCase().includes(searchWord) ||
                    comment.toLowerCase().includes(searchWord)
                );
            });

            setTimeout(resetBoard, 300);
        }

        else if (filterWords.length) {
            // filter posts that include any unwanted words
            _posts = filterWords.map( unwanted => {
                return posts.filter( ({ title="", comment="" }) => {
                    return !(
                        title.toLowerCase().includes(unwanted) ||
                        comment.toLowerCase().includes(unwanted)
                    );
                });
            });

        }

        else {
            _posts = posts
        }

        return _posts
    }

    loadMorePosts() {
        const { loadMorePosts, board } = this.props
        const newValue = board.limit + this.state.load

        loadMorePosts(newValue)
    }

    resetBoard() {
        // Reshuffle posts and scroll to top of container
        this.updateScroller({ scroll:"top" })
        this.applyLayout()
        this._board.trigger('scroll');
    }

    updateScroller(args) {
        this._board.nanoScroller(args);
    }

    handlePostClick( threadID ){
        // Fetch if user not highlighting any text
        if (!window.getSelection().toString()) {
            const { status, fetchThread, scrollHeader } = this.props;
            // always close subheader while fetching thread
            emitSubHeaderToggle(false);

            fetchThread({
                threadID,
                boardID: status.boardID,
                callback: emitThreadOpen
            });

            // Hide Thread scrollbar
            $('.thread-wrap').nanoScroller({ stop: true });
        }
    }
}
