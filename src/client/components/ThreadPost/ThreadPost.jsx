import React from 'react'
import uuid from 'uuid'
import moment from 'moment'
import {
    createMediaIfExists
} from './Media'
import Tooltip from '../Tooltip'

export default function ({post, children}) {
    const { id, title, date, imgsrc, comment, ext, references, time } = post

    const SRC = imgsrc
    const ID = 'post-media-' + id

    return (
        <div id={"p"+id} className='thread-post clearfix'>
            <div className='thread-post-info'>
                {renderTitle()}
                {renderTimeAgo(time)}
                <span className='thread-post-number'>No.{id}</span>
                {renderRefs(references)}
                <span className='mdi mdi-dots-vertical thread-post-options'></span>
            </div>
            {createMediaIfExists(ID, SRC, ext)}
            <blockquote dangerouslySetInnerHTML={{__html: comment}}/>
        </div>
    )
}


function renderRefs(refs) {
    return refs ? <span className='thread-post-backlink'>
        {refs.map( ref => 
            <span>
                <a 
                    className="quotelink refered" 
                    href={`#p${ref}`} 
                    key={uuid.v4()}>
                    {`>>${ref}`}
                </a>
            </span>
        )}
    </span> : ''
}

function renderTitle(title) {
    if (title) return <span className='thread-post-title'>{title}</span>
}

function renderTimeAgo(time){
    const post = moment(time);
    return <Tooltip 
                content={post.format('dddd [at] hh:mm:ss A')}
                className="date"
                position="top"
                >
        {post.fromNow()}
    </Tooltip>
}

