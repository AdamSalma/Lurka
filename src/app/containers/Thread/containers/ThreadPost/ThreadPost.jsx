import './ThreadPost.styles';
import React, { Component, PureComponent } from 'react';
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
    Comment,
    PostID,
    PostToolbar,
    ThreadMedia as Media
} from '../../components';

import { setHTML, bindMembersToClass } from '~/utils/react';
import { emitMediaReelOpen } from '~/events/publishers';

import { getShortTimeAgo } from '~/utils/time';


export class ThreadPost extends PureComponent {
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
                    <span className='name'>{name}</span>
                    <PostID id={id}/>
                    <Pipe />
                    <TimeAgo time={time}/>

                    <PostToolbar controls={controls}/>
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

const FunctionalThreadPost = ({ controls, post, onMediaToggle }) => {
    const {id, name, title, date, media, comment, references, time} = post;

    // TODO: Remove threadpost onClick propagation abd put a check on the thread onClick
    return (
        <div id={"p"+id} className='ThreadPost' onClick={e => e.stopPropagation()}>
            <div className='post-info'>
                <span className='name'>{name}</span>
                <PostID id={id}/>
                <Pipe />
                <TimeAgo time={time}/>
                <PostToolbar controls={controls}/>
            </div>
            <MediaInfo media={media}/>
            <Media media={media} onMediaToggle={onMediaToggle}/>
            <Comment comment={comment}/>
            <References refs={references}/>
        </div>
    );
};

FunctionalThreadPost.displayName = 'FunctionalThreadPost';

export default FunctionalThreadPost;
