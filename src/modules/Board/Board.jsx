import './Board.styles'
import React, { Component, PropTypes } from "react";
import classes from 'classnames'

import BoardPost from './BoardPost';
import SideIconGroup from './SideIconGroup';
import {Icon, Circle, Tooltip} from '~/components';

import { catchTooltip } from './events';
import createLayout from './layout';

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
            scrollTop: 0
        }

        bindMembersToClass(this,
            'onBoardPostClick',
            'loadMorePosts',
            'checkPostsInView',
        )

        this.throttle = throttleByCount(12, this.checkPostsInView)

        this.layoutProps = {
            targetSelector: '.BoardPost',
            containerSelector: '#board',
            margin: settings.boardpostMargin,
            gutterLeft: settings.boardOuterMargin,
            gutterRight: settings.boardOuterMargin
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

        // Hover over board posts reveals more info
        $(window).resize(() => this.applyLayout())
        catchTooltip(board);  // TODO: Implement catchtooltip on board
    }

    componentDidUpdate({ board, isAppReady, isDrawerOpen }) {
        if (isAppReady !== this.props.isAppReady && isAppReady) {
            this.onAppReady()
        }

        if (board.posts.length !== this.props.board.posts.length) {
            this.onPostsChange()
        }

        if (isDrawerOpen !== this.props.isDrawerOpen) {
            this.onDrawerToggle()
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
                        <SideIconGroup className="side-icons">
                            <div className="side-icon-wrap">
                                <Tooltip tooltip="Return to top" position="top">
                                    <Circle>
                                        <Icon name="chevron-up"/>
                                    </Circle>
                                </Tooltip>
                            </div>
                            <div className="side-icon-wrap">
                                <Tooltip tooltip="Refresh the board" position="bottom">
                                    <Circle>
                                        <Icon name="refresh"/>
                                    </Circle>
                                </Tooltip>
                            </div>
                        </SideIconGroup>
                        {this.createPosts()}
                    </div>
                </div>
            </div>
        );
    }

    // updateScrollTop({ scrollTop, scrollHeight }) {
    //     this.setState({

    onAppReady() {
        this.c
heckPostsInView()
    //         scrollTop,
    //         threadHeight: scrollHeight,
    //     })    // }
    }

    onDrawerToggle() {
        this.applyLayout = createLayout(
            this.props.isDrawerOpen
                ? this.layoutPropsForDrawer
                : this.layoutProps
        )
        this.applyLayout()
        setTimeout(this.checkPostsInView, 400)
    }

    onPostsChange() {
        console.info('Creating Layout')
        this.applyLayout()
        this._board.nanoScroller()
        this._board.trigger('scroll')

        setTimeout(this.checkPostsInView, 500)
    }

    checkPostsInView() {
        if (!this._posts)
            return

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
                )
            })
            setTimeout(()=>{
                // Reshuffle posts and scroll to top of container
                this.applyLayout()
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
            const { status, fetchThread, scrollHeader } = this.props;

            fetchThread(status.boardID, threadID);

            // Hide Thread scrollbar
            $('.thread-wrap').nanoScroller({ stop: true })
        }
    }
}
