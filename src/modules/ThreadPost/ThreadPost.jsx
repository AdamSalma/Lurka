import './ThreadPost.styles'
import React, { Component } from 'react'
import classes from 'classnames'
import LazyLoad from 'react-lazyload'

import { 
    TimeAgo, 
    Line,
    ToggleOnClick, 
    Image
} from '~/components'

import {
    renderControls,
    renderRefs,
    renderTitle,
    renderMedia,
    renderMediaInfo
} from './Render'

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
            <div id={"p"+id} className='thread-post clearfix' onClick={e => e.stopPropagation()}>
                <div className='post-info'>
                    {renderTitle(title)}
                    <span className='name'>{name}</span>
                    <span className='id'>#{id}</span>
                    <Line isVertical />
                    <TimeAgo time={time}/>
                    {renderControls(controls)}
                </div>
                {renderMediaInfo(media)}
                {renderMedia(media)}
                <blockquote {...setHTML(comment)}/>
                {renderRefs(references)}
            </div>
        )
    }
}



