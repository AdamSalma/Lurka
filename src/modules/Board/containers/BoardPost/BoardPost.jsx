import './BoardPost.styles'
import React, {PureComponent} from 'react';

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


export default class BoardPost extends PureComponent {

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
            <div id={"t" + post.id} className="BoardPost" onClick={ onClick }>
                {this.renderImage(onLoad, post)}
                {this.renderComment(post)}
            </div>
        )
    }

    renderImage(onLoad, {media}) {
        return !this.state.imageInvalidated ? (
            <div className="image-wrap">
                <Image
                    src={media.thumbnail}
                    onLoad={onLoad} onError={this.hideImage}
                />
            </div>
        ): false
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

    handleCommentClick() {
        this.state.commentSliderActivated
            ? this.slideCommentUp()
            : this.slideCommentDown();
    }

    onMouseLeave() {
        if (this.state.commentSliderActivated) {
            this.slideCommentDown()
        }
    }

    slideCommentUp() {
        this.animateComment({
            translateY: "+=100",
            translateZ: 0
        }, {
            duration: 400,
        });
    }

    slideCommentDown() {
        this.animateComment({
            translateY: 0,
            translateZ: 0
        }, {
            duration: 400,
        });
    }

    animateComment(styles, opts) {
        this._comment && $(this._comment).velocity('stop').velocity(styles, opts)
    }
}
