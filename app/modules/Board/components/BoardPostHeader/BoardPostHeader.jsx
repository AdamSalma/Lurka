import React from 'react';
import {
    TimeAgo,
    Icon,
    Counter
} from '~/components'


import './BoardPostHeader.styles';

const i = Lurka.icons

export default ({time, replies}) => {
    return <div className="BoardPostHeader">
        <div className="counter timeago">
            <TimeAgo time={time} canToggle={false}/>
        </div>
        <div className="counter comments">
            <Icon name={i.boardPostReplyCount}/>
            <Counter value={replies.textCount}/>
        </div>
        <div className="counter images">
            {/*<Icon name="image-filter-hdr"/>*/}
            <Icon name={i.boardPostImageCount}/>
            <Counter value={replies.imgCount} />
        </div>
    </div>
}
