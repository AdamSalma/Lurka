import './Board.styles';
import React, { Component, PropTypes } from "react";
import classes from 'classnames';

import createLayout from './layout';
import BoardPost from './BoardPost';
import SideIconGroup from './components/SideIconGroup';
import BoardStats from './components/BoardStats';
import {Icon, Circle, Tooltip} from '~/components';

import { onAppReady, onDrawerToggle } from '~/events/subscribers';
import { emitThreadOpen } from '~/events/publishers';
import {
    bindMembersToClass,
    throttleByCount,
    invokeAfterUninterruptedDelay
} from '~/utils';

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
        )

        this.throttle = throttleByCount(12, this.checkPostsInView)

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

        // Must be in callback because this.applyLayout changes
        $(window).resize(() => this.applyLayout())

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

        return (
            <div id="board" className={boardClasses} ref={ b => this._board = $(b)} onScroll={this.throttle}>
                <div className="nano-content">
                    <div className="header-gap"/>
                    <div className="posts" ref={p => this._posts = p}>
                        <BoardStats
                            posts={this.props.posts && this.props.posts.length}
                            images={this.props.imageCount}
                            replies={this.props.replyCount}
                            boardName={this.props.boardName}
                        />
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

    checkPostsInView() {
        if (!this._posts)
            return

        const winHeight = window.innerHeight + 200
        $.each(this._posts.children, function(index, element) {
            if (element.getBoundingClientRect().bottom <= winHeight) {
                element.classList.add('animate');
            }
        })
    }

    renderPosts() {
        const posts = this.getPosts()
        return posts.map( (post, index) => {
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
        const { posts, limit, searchWord, filterWords } = this.props.board;
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
