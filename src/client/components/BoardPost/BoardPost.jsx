import React, {Component} from 'react';
import Tooltip from '../Tooltip';
import Counter from "../Counter"

import Velocity from "velocity-animate"

export default class BoardPost extends Component {

    constructor(props) {
        super(props);
        this.state = {
            maxPostHeight: 400,
            isMovable: null
        }

        this.scrollPostUp = this.scrollPostUp.bind(this)
        this.scrollPostDown = this.scrollPostDown.bind(this)
        this.hideImage = this.hideImage.bind(this)
    }

    render() {
        const { fetchThread, reshuffle, post: {
            id, title, comment, date, media, replies
        }} = this.props;

        return (
            <div 
                id={"t"+id}
                className="board-post"
                onClick={ fetchThread.bind(null, id) }
                onMouseEnter={this.scrollPostUp}
                onMouseLeave={this.scrollPostDown}
            >
                <div className="image-wrap">   
                    <img ref="image" src={media.thumbnail} onLoad={reshuffle} onError={this.hideImage}/>
                </div>   
                <div className="comment-wrap clearfix" ref="comment">
                    <div className="counters">
                        <div className="float-right">
                            <i className="mdi mdi-comment-text"/>
                            <Counter value={replies.textCount}/>
                        </div>
                        <div className="float-right">
                            <i className="mdi mdi-image-filter-hdr"/>
                            <Counter value={replies.imgCount} />
                        </div>
                    </div>
                    <div className="op">
                        <b dangerouslySetInnerHTML={{__html: title}} className="title" />
                        <div dangerouslySetInnerHTML={{__html: comment}} />
                    </div>
                </div>
            </div>
        )
    }

    scrollPostUp(){
        const { comment, image } = this.refs;
        const imgHeight = image.clientHeight, 
              commentHeight = comment.clientHeight,
              maxHeight = this.state.maxPostHeight

        if (imgHeight + commentHeight > maxHeight ) {
            // comment is long and offscreen; make it more viewable by moving it up
            
            // move by difference, else if that would move comment outside 
            // thread, use image height (scroll to top)
            const offScreenAmount = commentHeight - (maxHeight - imgHeight) + 5 // 5px for padding at bottom of comment
            const height = imgHeight/1.5 // 3/4 of image height
            const distance = offScreenAmount < height ? offScreenAmount : height
            Velocity(comment, {top: `-${distance}px`}, 200, 'linear')
        }
    }
 
    scrollPostDown(){
        Velocity(this.refs.comment, {top: 0}, 200)
    }

    hideImage() {
        this.refs.image.classList.add('hidden')
    }
}
