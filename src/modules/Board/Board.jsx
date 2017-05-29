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
            'checkPostsInView',
            'handleScroll',
            'resetBoard'
        )

        this.onScroll = throttleByCount(10, this.handleScroll);
        this.previousScrollTop = 0

        this.layoutProps = {
            targetSelector: '.BoardPost',
            containerSelector: '#board',
            margin: settings.boardPostMargin,
            gutterLeft: settings.boardOuterMargin,
            gutterRight: settings.boardOuterMargin,
            gutterTop: settings.headerHeight
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

    componentDidUpdate({ posts }) {
        if (posts.length !== this.props.posts.length) {
            this.onPostsChange();
        }
    }

    componentWillUnmount() {
        this._board.off();
    }

    render() {
        const boardClasses = classes('Board', 'nano', {
            'show-all': this.props.isBeingSearched
        })

                        // <BoardStats
                        //     posts={this.props.posts && this.props.posts.length}
                        //     images={this.props.imageCount}
                        //     replies={this.props.replyCount}
                        //     boardName={this.props.boardName}
                        // />
        return (
            <div id="board" className={boardClasses} ref={b => this._board = $(b)}>
                <div className="nano-content" onScroll={this.onScroll}>
                    <div className="posts" ref={x => this._postContainer = x}>
                        {this.renderPosts()}
                    </div>
                </div>
            </div>
        );
    }

    renderPosts() {
        // TODO: Do a quick render using index
        return this.getPosts().map((post, index) => {
            return <BoardPost
                key={post.id}
                post={post}
                onClick={() => this.handlePostClick(post.id)}
                onLoad={this.applyLayout}
            />
        });
    }

    // updateScrollTop({ scrollTop, scrollHeight }) {
    //     this.setState({
    //         scrollTop,
    //         threadHeight: scrollHeight,
    //     })
    // }

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

    resetBoard() {
        // Reshuffle posts and scroll to top of container
        this.updateScroller({ scroll:"top" });
        this.applyLayout()
        this._board.trigger('scroll');
    }

    updateScroller(args) {
        this._board.nanoScroller(args);
    }

    handlePostClick( threadID ){
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
