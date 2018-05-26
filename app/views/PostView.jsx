import React, { Component } from 'react';
import cx from 'classnames'

import Post from '~/modules/Post';

class PostView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { className, } = this.props;
        return (
            <section className={cx('PostView', className)}>
                <Post position="center"/>
            </section>
        );
    }
}

export default PostView;
