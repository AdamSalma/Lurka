import './Board.styles';
import React, { Component, PropTypes } from "react";
import cx from 'classnames';

import {
    Icon,
    Circle,
    Tooltip,
    CircleSpinner as Spinner,
    Button
} from '~/components';

import {
    NoSearchResults,
    BoardStats,
} from './components';

import {
    BoardPost as Post,
    BoardToolbar as Toolbar
} from './assemblies';

import createLayout from './layout';
import { onAppReady, onSettingsToggle, onBoardReset } from '~/events/subscribers';
import {
    emitThreadOpen,
    emitSubHeaderToggle
} from '~/events/publishers';

import { bindMembersToClass } from '~/utils/react'
import {
    throttleByCount,
    invokeAfterUninterruptedDelay
} from '~/utils/throttle';

const s = window.appSettings


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
            headerHeight: s.headerHeight,  // Beware if header height changes
            scrollTop: 0,
            isDrawerOpen: props.isDrawerOpen
        }

        this.onScroll = throttleByCount(10, this.handleScroll);
        this.previousScrollTop = 0

        this.layoutProps = {
            targetSelector: '.BoardPost',
            containerSelector: '#board',
            margin: s.boardPostMargin,
            gutterLeft: s.boardOuterMargin,
            gutterRight: s.boardOuterMargin,
            // gutterTop: s.headerHeight + s.subheaderHeight
        }

        this.layoutPropsForDrawer = Object.assign({}, this.layoutProps, {
            gutterRight: s.settingsWidth + s.boardOuterMargin
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

    @onBoardReset
    onBoardReset() {
        this.updateScroller({ scroll:"top" });
    }

    @onAppReady
    onAppReady() {
        this.revealPostsPartiallyInView();
    }

    @onSettingsToggle
    onSettingsToggle(isOpen) {
        this.applyLayout = createLayout(
            isOpen
                ? this.layoutPropsForDrawer
                : this.layoutProps
        )
        this.applyLayout()
        setTimeout(this.revealPostsInView, 400);
    }

    componentDidMount() {
        // Board scroller
        this.updateScroller(this.nanoOpts)

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

        return (
            <div id="board" className={boardClasses} ref={b => this._board = $(b)}>
                <div className="nano-content" onScroll={this.onScroll}>
                    <Toolbar
                        posts={posts}
                        statistics={statistics}
                        onSearch={searchBoard}
                    />
                    <div className="posts" ref={x => this._postContainer = x}>
                        {isFetching && !posts.length
                            && <Spinner className="Board__Spinner"/>}
                        {this.renderPosts()}
                    </div>
                </div>
            </div>
        );
    }

    renderPosts() {
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
        // Condition overrides toggle
        emitSubHeaderToggle(e.target.scrollTop < this.previousScrollTop);
        this.previousScrollTop = e.target.scrollTop;
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

        else if (isFiltered) {
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

    updateScroller(args) {
        this._board.nanoScroller(args);
    }

    handlePostClick = (threadID) => {
        // Fetch if user not highlighting any text
        if (!window.getSelection().toString()) {
            const { boardID, fetchThread, scrollHeader } = this.props;
            // always close subheader while fetching thread
            emitSubHeaderToggle(false);

            fetchThread({
                threadID,
                boardID: boardID,
                callback: emitThreadOpen
            });
        }
    }
}
