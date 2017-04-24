import './ThreadPost.styles'
import React, { Component } from 'react'
import classes from 'classnames'

import {
    TimeAgo,
    Line,
    ToggleOnClick,
    Image
} from '~/components'

import Controls from './components/Controls'
import References from './components/References'
import Title from './components/Title'
import Media from './components/Media'
import MediaInfo from './components/MediaInfo'
import Comment from './components/Comment'

import { setHTML } from '~/utils'

export default class ThreadPost extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mediaExpanded: false
        }
    }

    render() {
        const { controls, post: {
            id, name, title, date, media, comment, references, time
        }} = this.props

        return (
            <div id={"p"+id} className='ThreadPost' onClick={e => e.stopPropagation()}>
                <div className='post-info'>
                    <Title title={title}/>
                    <span className='name'>{name}</span>
                    <span className='id'>#{id}</span>
                    <Line isVertical />
                    <TimeAgo time={time}/>
                    <Controls controls={controls}/>
                </div>
                <MediaInfo media={media}/>
                <Media media={media}/>
                <Comment comment={comment}/>
                <References refs={references}/>
            </div>
        )
    }
}



