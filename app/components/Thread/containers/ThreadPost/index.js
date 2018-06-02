import './styles';
import React, { Component, PureComponent } from 'react';
import classes from 'classnames';

import {
    TimeAgo,
    Pipe,
    ToggleOnClick,
    Image,
    Icon
} from '~/components/UI';

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

const i = Lurka.icons

export class ThreadPost extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            mediaExpanded: false
        }
        bindMembersToClass(this, 'handleLargeImageClick');
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log("ThreadPost.shouldComponentUpdate")
        return false
    }

    render() {
        const { controls, onContextMenu, post: {
            id, name, title, date, media, comment, references, time
        }} = this.props;

        return (
            <div id={"p"+id} className='ThreadPost' onContextMenu={onContextMenu}>
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

const FunctionalThreadPost = ({ controls, post, onMediaToggle, openControls, onContextMenu }) => {
    // const {id, name, title, date, media, comment, references, time} = post;

    return (
        <div id={"p" + post.id} className='ThreadPost' onContextMenu={onContextMenu}>
            <div className='post-info'>
                <span className='name'>{post.name}</span>
                <PostID id={post.id}/>
                <Pipe />
                <TimeAgo time={post.time}/>
                <div onClick={openControls} className="ThreadPost__controls">
                    <div className="menu-toggle">
                        <Icon name={i.threadPostMenu} />
                    </div>
                </div>
            </div>
            <MediaInfo media={post.media}/>
            <Media media={post.media} onMediaToggle={onMediaToggle}/>
            <Comment comment={post.comment}/>
            <References refs={post.references}/>
        </div>
    );
};

FunctionalThreadPost.displayName = 'FunctionalThreadPost';

export default FunctionalThreadPost;
