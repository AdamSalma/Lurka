import React from 'react';
import {
    TimeAgo, 
    Icon,
    Counter
} from '~/components'

export default ({time, replies}) => {
    return <div className="counters">
        <div className="counter comments">
            <Icon name="comment-text"/>
            <Counter value={replies.textCount}/>
        </div>
        <div className="counter images">
            <Icon name="image-filter-hdr"/>
            <Counter value={replies.imgCount} />
        </div>
        <div className="counter timeago">
            <TimeAgo time={time} canToggle={false}/>
        </div>
    </div>
}
