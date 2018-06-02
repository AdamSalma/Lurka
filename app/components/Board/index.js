import React, { Component } from "react";
import cx from 'classnames';

// Main
import './styles';
import config from './config'
import connect from './connect'
import Utils from '~/utils'

// Other
import {
    Icon,
    Circle,
    Tooltip,
    CircleSpinner as Spinner,
    Button,
    MasonryGrid as BoardGrid,
    Line,
    Scrollable,
    SidePullout,
    Parallax
} from '~/components/UI';

import {
    NoSearchResults,
    BoardMetadata,
    BoardSpinner,
    ToTopButton
} from './components';
import {
    BoardPost as Post,
    BoardToolbar as Toolbar,
    BoardHeader
} from './assemblies';

import {
    emitThreadOpen, emitHeaderExpand, emitHeaderShrink, emitContextMenuOpen, emitOpenHeaderPanel, emitPostToggle,
    onAppReady, onSettingsToggle, onBoardReset, onHeaderExpand, onHeaderShrink
} from '~/events'


export class Board extends Component {

    constructor(props) {
        super(props);

        // this.onScroll = Utils.throttle.throttleByCount(7, this.handleScroll);
        this.onScroll = Utils.throttle.invokeThenIgnoreForPeriod(50, this.handleScroll);
        this.previousScrollTop = 0;

        this.applyLayout = BoardGrid(
            props.isDrawerOpen
                ? config.masonryGridWithDrawer
                : config.masonryGrid
        );

        this.isSubheaderExpanded =
            Utils.types.isDefined(props.isSubheaderExpanded)
                 ? props.isSubheaderExpanded
                 : true;
    }

    @onBoardReset
    onBoardReset(duration=0) {
        this.scrollToTop({ duration, complete: emitHeaderExpand})
    }

    @onAppReady
    onAppReady() {
        this.revealPostsPartiallyInView();
    }

    @onSettingsToggle
    onSettingsToggle(isDrawerOpen) {
        this.applyLayout = BoardGrid(
            isDrawerOpen
                ? config.masonryGridWithDrawer
                : config.masonryGrid
        );
        this.applyLayout()
        setTimeout(this.revealPostsInView, 400);
    }

    @onHeaderExpand
    onHeaderExpand() {
        this.toggleToTopButton({visible: false})
    }

    @onHeaderShrink
    onHeaderShrink() {
        this.toggleToTopButton({visible: true})
    }

    toggleToTopButton = ({visible}) => {
        visible
            ? this._toTop.show()
            : this._toTop.hide()
    }

    componentDidMount() {
        // Board scroller
        this.updateScroller(config.nano);

        const onWindowResize =
            // Must be in callback because this.applyLayout changes
            Utils.throttle.invokeAfterUninterruptedDelay(50, this.applyLayout)

        $(window).resize(onWindowResize)

        if (this.props.posts.length) {
            setTimeout(this.applyLayout(), 500)
        }

        /* REMOVE ME!!! */

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
        $(this.boardRef).off();
    }

    setScrollerRef = ref => this.scroller = ref
    setPostsRef = ref => this._postContainer = ref

    get boardRef() {
        return this.scroller._container
    }

    render() {
        const { posts, isFetching, statistics, searchBoard, didInvalidate, currentBoard={} } = this.props;


        const isActive = !isFetching && !didInvalidate;
        const boardClasses = cx('Board', 'nano', {
            'disable-animations': this.props.isBeingSearched
        });

        // Posts get filtered by search etc
        const BoardPosts = this.createPosts();
        console.log("Rendered BoardPosts", BoardPosts)



        return (
            <div className="BoardWrapper" onContextMenu={(e) => emitContextMenuOpen({
                ContextMenu: <div>Board ContextMenu</div>,
                event: e
            })}>
                <Scrollable translate3d
                    containerProps={{className:boardClasses, id: "board"}}
                    ref={this.setScrollerRef}
                    className="ParallaxArea"
                    onScroll={this.onScroll}>
                    <div className="ExpandedHeaderGap"/>
                    <BoardHeader
                        isDisabled={isFetching || didInvalidate}
                        isSpinnerActive={isFetching && !didInvalidate}
                        isActive={isActive}
                        ErrorMessage={didInvalidate && "Error loading board"}
                        onSearch={this.handleSearch}
                        boardID={currentBoard.boardID}
                        boardTitle={currentBoard.title}
                        onSort={this.props.onSort}
                        sortBy={this.props.sortBy}
                        onRefresh={this.handleRefresh}
                        onOpenMenu={this.handleOpenMenu}
                        onFavouriteToggle={this.handleFavouriteToggle}
                        isFavourite={this.props.isFavourite}
                        handlePostOpen={this.handlePostOpen}
                    />
                    {/*<Parallax.Background className="BoardParallax--header">
                    </Parallax.Background>
                    <Parallax.Foreground className="BoardParallax--posts">
                    </Parallax.Foreground>*/}
                    {isActive &&
                        <BoardMetadata
                            postsShown={BoardPosts.length}
                            totalPosts={posts.length}
                            prefix=""
                            suffix=""
                        />
                            // totalImages={statistics.images}
                            // totalReplies={statistics.replies}
                    }
                    {isActive && <div className="PostLinebreak"/>}
                    <div className="posts" ref={this.setPostsRef} onContextMenu={(e) => emitContextMenuOpen({
                        ContextMenu: <div>BoardPost ContextMenu</div>,
                        event: e
                    })}>
                        {BoardPosts}
                    </div>
                </Scrollable>
                <ToTopButton startHidden
                    ref={(el) => this._toTop = el}
                    onClick={() => this.scrollToTop({duration: 600})}
                />
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
        this.revealPostsPartiallyInView();
        this.emitScroll(e)
    }

    emitScroll(e) {
        const canExpandHeader = e.target.scrollTop < config.scroll.headerToggleOffset;

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
        var scrollEvent = new CustomEvent("scroll");
        this.boardRef.dispatchEvent(scrollEvent);
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
        this.scroller.updateScroller(args);
    }

    scrollToTop = (options) => {
        options = Object.assign({}, {
            duration: 1000,
            easing: [0.455, 0.03, 0.515, 0.955],
            mobileHA: false
        }, options)

        const $scrollArea = $(this.boardRef).find('.nano-content');
        const $firstChild = $scrollArea.find(">:first-child");

        options.container = $scrollArea

        return this.scrollTo($firstChild, options);
    }

    scrollTo (element, options) {
        return element.velocity("scroll", options)
    }

    handleSearch = (searchValue) => {
        console.log("Board.handleSearch:", searchValue)
        // Change class
        if (searchValue === "") {
            // remove animation-disabling class from board
            this.boardRef.classList.remove('disable-animations')
        } else {
            // add animation-disabling class from board
            this.boardRef.classList.add('disable-animations')
        }

        this.props.searchBoard(searchValue);
        !searchValue && setTimeout(this.applyLayout, 200)

    }

    handleRefresh = () => {
        const { fetchBoard, boardID } = this.props;

        fetchBoard(boardID)
    }

    handleOpenMenu = () => {
        emitOpenHeaderPanel({
            panelID: "menu",
            closeIfOpen: false
        })
    }

    handleFavouriteToggle = () => {
        const { isFavourite, boardID } = this.props;
        console.warn("isFavourite", isFavourite);

        if (isFavourite) {
            this.props.removeBoardFromFavourites(boardID)
        } else {
            this.props.addBoardToFavourites(boardID)
        }
    }

    handlePostOpen() {
        emitPostToggle({
            context: "board"
        })
    }
}

export default connect(Board)
