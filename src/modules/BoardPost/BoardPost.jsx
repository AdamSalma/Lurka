import React, {Component} from 'react';
import LazyLoad from 'react-lazyload';

import {
    Counter,
    Tooltip,
    Spinner,
    Icon,
    Image,
    Line
} from '~/components'

import PostHeader from './BoardPostHeader'

function setHTML(html) {
    return {
        dangerouslySetInnerHTML: {
            __html: html
        }
    }
}


export default class BoardPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            maxCommentHeght: 150,
            isMovable: null,
            imageInvalidated: false
        }

        this.hideImage = this.hideImage.bind(this)
    }

    render() {
        const { onClick, onLoad, post } = this.props;

        return (
            <div id={"t" + post.id} className="board-post" onClick={ onClick }>
                {this.renderImage(onLoad, post)}
                {this.renderComment(post)}
            </div>
        )
    }

    renderImage(onLoad, {media}) {
        return !this.state.imageInvalidated ? <div className="image-wrap">
            <LazyLoad height={media.height} offsetTop={200} once>
                <Image 
                    src={media.thumbnail} 
                    width={media.width} height={media.height}
                    onLoad={onLoad} onError={this.hideImage}
                />
            </LazyLoad>
        </div> : false
    }

    renderComment({ title, comment, time, replies }) {
        return (
            <div className="comment-wrap">
                <div className="comment-slider" ref={el => this._comment = $(el)}>
                    <PostHeader replies={replies} time={time}/>
                    <Line />
                    <div className="op">
                        { title && <b {...setHTML(title)} className="title" /> }
                        <div {...setHTML(comment)} className="comment"/>
                    </div>
                </div>
            </div>
        )
    }

    hideImage() {
        this.setState({
            imageInvalidated: true
        })
    }
}
