import React, { Component } from "react";
import cx from 'classnames';

// Main
import './styles';
import config from './config'
import connect from './connect'

// Other
import {
    Icon,
    Circle,
    Tooltip,
    CircleSpinner as Spinner,
    Button,
    MasonryGrid,
    Line
} from '~/components';

import {
    NoSearchResults,
    BoardMetadata,
    BoardSpinner
} from './components';
import {
    BoardPost as Post,
    BoardToolbar as Toolbar,
    BoardHeader as Header
} from './assemblies';

import {
    emitThreadOpen, emitHeaderExpand, emitHeaderShrink,
    onAppReady, onSettingsToggle, onBoardReset
} from '~/events'

import {throttleByCount, invokeAfterUninterruptedDelay} from '~/utils/throttle';
import {isDefined} from '~/utils/types'

const s = window.appSettings


export class Board extends Component {

    constructor(props) {
        super(props);

        this.state = {
            load: 25,
            headerHeight: s.headerHeight,
            scrollTop: 0,
            isDrawerOpen: props.isDrawerOpen
        }

        this.onScroll = throttleByCount(7, this.handleScroll);
        this.previousScrollTop = 0;

        this.applyLayout = MasonryGrid(
            props.isDrawerOpen
                ? config.masonryGridWithDrawer
                : config.masonryGrid
        );

        this.isSubheaderExpanded =
            isDefined(props.isSubheaderExpanded)
                 ? props.isSubheaderExpanded
                 : true;

        // TO
        window.scrollToTop = this.scrollToTop
    }

    @onBoardReset
    onBoardReset() {
        this.scrollToTop({duration: 0})
        emitHeaderExpand()
    }

    @onAppReady
    onAppReady() {
        this.revealPostsPartiallyInView();
    }

    @onSettingsToggle
    onSettingsToggle(isDrawerOpen) {
        this.applyLayout = MasonryGrid(
            isDrawerOpen
                ? config.masonryGridWithDrawer
                : config.masonryGrid
        );
        this.applyLayout()
        setTimeout(this.revealPostsInView, 400);
    }

    componentDidMount() {
        // Board scroller
        this.updateScroller(config.nano);

        const onWindowResize =
            // Must be in callback because this.applyLayout changes
            invokeAfterUninterruptedDelay(50, () => this.applyLayout())

        $(window).resize(onWindowResize)

        // Hover over board posts reveals more info
        // catchTooltip(board);  // TODO: Implement catchtooltip on board
    }

    componentWillUpdate({ posts }) {
        if (posts !== this.props.posts) {
            this.onPostsChange();
        }
    }

    componentDidUpdate({ posts }) {
        if (posts !== this.props.posts) {
            this.applyLayout();
            setTimeout(this.revealPostsPartiallyInView, 200);
        }
    }

    componentWillUnmount() {
        this._board.off();
    }

    render() {
        const { posts, isFetching, statistics, searchBoard } = this.props;

        const boardClasses = cx('Board', 'nano', {
            'disable-animations': this.props.isBeingSearched
        })

        const createdPosts = this.createPosts();

        return (
            <div id="board" className={boardClasses} ref={b => this._board = $(b)}>
                <div className="nano-content" onScroll={this.onScroll}>
{/*                    <Toolbar
                        posts={posts}
                        statistics={statistics}
                        onSearch={searchBoard}
                    />*/}
                    <BoardMetadata
                        postsShown={createdPosts.length}
                        totalPosts={posts.length}
                        totalImages={statistics.images}
                        totalReplies={statistics.replies}
                    />
                    <div className="PostLinebreak"/>
                    <div className="posts" ref={x => this._postContainer = x}>
                        {isFetching && !posts.length &&
                            <BoardSpinner/>}
                        {createdPosts}
                    </div>
                </div>
            </div>
        );
    }

    createPosts() {
        var pageNum;

        return this.getPosts().map(
            (post, index) => {
                if (post.page !== pageNum) {
                    pageNum = post.page
                }
                return <Post
                    className={index < 10 ? "animate" : ""}
                    key={post.id}
                    post={post}
                    onClick={() => this.handlePostClick(post.id)}
                />
            }
        );
    }

    // updateScrollTop({ scrollTop, scrollHeight }) {
    //     this.setState({
    //         scrollTop,
    //         threadHeight: scrollHeight,
    //     })
    // }

    onPostsChange() {
        this.resetBoard();
        setTimeout(this.revealPostsPartiallyInView, 400)
    }

    handleScroll = (e) => {
        e.stopPropagation();
        this.revealPostsInView();
        this.emitScroll(e)
    }

    emitScroll(e) {
        const toolbarHeight = 300;
        const canExpandHeader = e.target.scrollTop < toolbarHeight;

        if (this.isSubheaderExpanded === canExpandHeader) {
            return
        }

        console.log("Board -> canExpandHeader:", canExpandHeader)
        canExpandHeader ? emitHeaderExpand() : emitHeaderShrink();

        this.isSubheaderExpanded = canExpandHeader;
    }

    revealPostsInView = () => {
        if (!this._postContainer)
            return

        const toloratedHeight = window.innerHeight + 250;
        $.each(this._postContainer.children, function(index, element) {
            if (element.getBoundingClientRect().bottom <= toloratedHeight) {
                element.classList.add('animate');
            } else {
                return false
            }
        })
    }

    revealPostsPartiallyInView = () => {
        if (!this._postContainer)
            return

        const toloratedHeight = window.innerHeight;
        $.each(this._postContainer.children, function(index, element) {
            if (element.getBoundingClientRect().top < toloratedHeight) {
                element.classList.add('animate');
            }
        })
    }


    getPosts() {
        const { isBeingSearched, isFiltered } = this.props;

        if (isBeingSearched) {
            setTimeout(this.resetBoard, 300);
            return this.props.postsBySearchTerm
        }

        if (isFiltered) {
            return this.props.postsByFilterTerm
        }

        return this.props.posts
    }

    resetBoard = () => {
        // Reshuffle posts and scroll to top of container
        this.updateScroller({ scroll:"top" });
        this.applyLayout();
        this.revealPostsPartiallyInView();
        this._board.trigger('scroll');
    }


    handlePostClick = (threadID) => {
        // Fetch if user not highlighting any text
        if (!window.getSelection().toString()) {
            const { boardID, fetchThread, scrollHeader } = this.props;
            // always close subheader while fetching thread
            emitHeaderShrink();

            fetchThread({
                threadID,
                boardID: boardID,
                callback: emitThreadOpen
            });
        }
    }

    updateScroller(args) {
        this._board.nanoScroller(args);
    }

    scrollToTop = (options) => {
        options = options || {
            duration: 1000,
            easing: 'ease',
            mobileHA: false
        }

        const $scrollArea = this._board.find('.nano-content');
        const $firstChild = $scrollArea.find(">:first-child");

        options.container = $scrollArea

        return this.scrollTo($firstChild, options);
    }

    scrollTo (element, options) {
        return element.velocity("scroll", options)
    }
}

export default connect(Board)
