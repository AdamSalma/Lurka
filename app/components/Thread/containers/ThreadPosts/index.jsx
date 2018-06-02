import React, { Component } from 'react';
import cx from 'classnames';

import Post from '../ThreadPost'
import { ThreadPostContextMenu as ContextMenu } from '~/components/UI';

import { emitContextMenuOpen } from '~/events'


class ThreadPosts extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { className, quickRender } = this.props;
        return (
            <div className={cx('ThreadPosts', className)} >
                {this.renderPosts(quickRender)}
            </div>
        );
    }

    renderPosts(quickRender=false) {
        const posts = this.props.posts;

        if (!posts || !posts.length) {
            console.warn("Thread could not render posts. Received:", posts);
            return null
        }

        const _posts = []

        for (var i = 0; i < posts.length; i++) {
            if (quickRender && i >= 8) {
                // Performance bonus when animating thread into view
                console.warn("Quick thread render");
                break
            }

            _posts.push(this.renderPost(posts[i], i))
        }

        return _posts
    }

    renderPost(post, index) {
        return (
            <Post key={post.id}
              post={post}
              onMediaToggle={() => this.props.mediaRegistery.onMediaToggle(post)}
              onContextMenu={event => emitContextMenuOpen({
                event, ContextMenu: <ContextMenu post={post} index={index}/>
              })}
            />
        )
    }

    renderAllPosts() {
        this.renderPosts(false);
    }
}

export default ThreadPosts;
