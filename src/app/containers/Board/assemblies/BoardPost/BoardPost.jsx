import './BoardPost.styles'
import React, {PureComponent} from 'react';
import cx from 'classnames'

import {
    Counter,
    Tooltip,
    Spinner,
    Icon,
    // Image,
    Line
} from '~/components'

import {
    BoardPostHeader as Header,
    BoardPostComment as Comment,
    BoardPostImage as Image
} from '../../components';
import { setHTML } from '~/utils/react';


const BoardPost = ({ onClick, onImageLoad, post, className }) => {
    let { thumbnail, width, height } = post.media;
    height *= (232/width);  //  Calculates placeholder height before image loads. 232 is post width

    return (
        <div id={"t" + post.id} className={cx("BoardPost", className)} onClick={ onClick }>
            <Image
                src={thumbnail}
                height={height}
                onLoad={onImageLoad}
            />
            <Comment
                title={post.title}
                comment={post.comment}
                time={post.time}
                replies={post.replies}
            />
        </div>
    )
}

export default BoardPost;
