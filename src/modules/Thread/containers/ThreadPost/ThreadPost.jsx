import './ThreadPost.styles';
import React, { Component } from 'react';
import classes from 'classnames';

import {
    TimeAgo,
    Pipe,
    ToggleOnClick,
    Image
} from '~/components';

import {
    ControlMenu,
    References,
    Title,
    MediaInfo,
    Comment
} from '../../components';

import Media from '../ThreadMedia'

import { setHTML, bindMembersToClass } from '~/utils/react';
import { emitMediaReelOpen } from '~/events/publishers';

export default class ThreadPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mediaExpanded: false
        }
        bindMembersToClass(this, 'handleLargeImageClick');
    }

    render() {
        const { controls, post: {
            id, name, title, date, media, comment, references, time
        }} = this.props;

        return (
            <div id={"p"+id} className='ThreadPost' onClick={e => e.stopPropagation()}>
                <div className='post-info'>
                    <Title title={title}/>
                    <span className='name'>{name}</span>
                    <span className='id'>#{id}</span>
                    <Pipe />
                    <TimeAgo time={time}/>
                    <ControlMenu controls={controls}/>
                </div>
                <MediaInfo media={media}/>
                <Media media={media} onLargeImageClick={this.handleLargeImageClick}/>
                <Comment comment={comment}/>
                <References refs={references}/>
            </div>
        )
    }

    handleLargeImageClick(e) {
        emitMediaReelOpen(this.props.post.media.srcLarge);
    }
}



