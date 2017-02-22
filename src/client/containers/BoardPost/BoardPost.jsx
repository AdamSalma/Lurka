import React, {Component} from 'react';

import {
    Image,
    Counter,
    Tooltip,
    Spinner,
    Icon
} from '~/components'


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
            maxPostHeight: 400,
            isMovable: null,
            imageInvalidated: false
        }

        this.renderImage = this.renderImage.bind(this)
        this.renderComment = this.renderComment.bind(this)

        this.scrollPostUp = this.scrollPostUp.bind(this)
        this.scrollPostDown = this.scrollPostDown.bind(this)
        this.hideImage = this.hideImage.bind(this)
    }

    render() {
        const { onClick, post } = this.props;

        return (
            <div 
                id={"t" + post.id} className="board-post"
                onClick={ onClick }
                onMouseEnter={this.scrollPostUp}
                onMouseLeave={this.scrollPostDown}
            >
                {this.renderImage()}
                {this.renderComment()}
            </div>
        )
    }

    renderImage() {
        const {post:{media}, onLoad} = this.props
        return !this.state.imageInvalidated ? (
            <div className="image-wrap">
                <Image 
                    src={media.thumbnail} 
                    width={media.width} height={media.height}
                    loader={<Spinner/>}
                    onLoad={onLoad} onError={this.hideImage}/>
            </div>
        ) : false
    }

    renderComment() {
        const {post:{ title, comment, date, media, replies }} = this.props

        return (
            <div className="comment-wrap clearfix" ref={el => this._comment = $(el)}>
                <div className="counters">
                    <div className="float-right">
                        <Icon name="comment-text"/>
                        <Counter value={replies.textCount}/>
                    </div>
                    <div className="float-right">
                        <Icon name="image-filter-hdr"/>
                        <Counter value={replies.imgCount} />
                    </div>
                </div>
                <div className="op">
                    <b {...setHTML(title)} className="title" />
                    <div {...setHTML(comment)} />
                </div>
            </div>
        )
    }

    scrollPostUp(){
        // TODO: get height from props not ref
        const imgHeight = this.props.post.media.height, 
              commentHeight = this._comment.clientHeight,
              maxHeight = this.state.maxPostHeight

        if (imgHeight + commentHeight > maxHeight ) {
            // comment is long and offscreen; make it more viewable by moving it up
            
            // move by difference, else if that would move comment outside 
            // thread, use image height (scroll to top)
            const offScreenAmount = commentHeight - (maxHeight - imgHeight) + 5 // 5px for padding at bottom of comment
            const height = imgHeight/1.5 // 3/4 of image height
            const distance = offScreenAmount < height ? offScreenAmount : height
            this._comment.velocity({top: `-${distance}px`}, 200, 'linear')
        }
    }
 
    scrollPostDown(){
        this._comment.velocity({top: 0}, 200)
    }

    hideImage() {
        this.setState({
            imageInvalidated: true
        })
    }
}
