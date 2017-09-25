import React, { Component } from 'react';
import cx from 'classnames';
import Post from '../ThreadPost'

class ThreadPosts extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { className, quickRender } = this.props;
        return (
            <div className={cx('ThreadPosts', className)}>
                {this.renderPosts(quickRender)}
            </div>
        );
    }

    renderPosts(quickRender=false) {
        const posts = this.props.posts;

        if (!posts || !posts.length) {
            console.warn("Could not render posts. Received:", posts);
            return null
        }

        const _posts = []

        for (var i = 0; i < posts.length; i++) {
            if (quickRender && i >= 8) {
                // Performance bonus when animating thread into view
                console.warn("Quick render");
                break
            }

            console.log('Thread render in progress');

            _posts.push(this.renderPost(posts[i]))
        }

        return _posts
    }

    renderPost(post) {
        return <Post key={post.id} post={post} onMediaToggle={
            () => this.props.mediaRegistery.onMediaToggle(post)
        }/>
    }

    renderAllPosts() {
        this.renderPosts(false);
    }
}

export default ThreadPosts;
