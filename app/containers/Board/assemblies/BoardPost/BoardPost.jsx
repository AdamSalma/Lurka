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

const { boardPostWidth } = Lurka.settings;

const BoardPost = ({ onClick, onImageLoad, post, className, onContextMenu }) => {
    let { thumbnail, width, height } = post.media;
    height *= (boardPostWidth/width);  //  Calculates placeholder height before image loads. 232 is post width

    return (
        <div id={"t" + post.id} className={cx("BoardPost", className)} onClick={onClick} onContextMenu={onContextMenu}>
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
