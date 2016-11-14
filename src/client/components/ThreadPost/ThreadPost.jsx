import React from 'react'
import uuid from 'uuid'
import {
    createMediaIfExists
} from './Media'
import TimeAgo from '../TimeAgo'

export default function ({post, children}) {
    const { id, name, title, date, imgsrc, comment, ext, references, time } = post

    const SRC = imgsrc
    const ID = 'post-media-' + id

    return (
        <div id={"p"+id} className='thread-post clearfix'>
            <div className='thread-post-info'>
                {renderTitle(title)}
                <span className='thread-post-name'>{name}</span>
                <TimeAgo time={time}/>
                <span className='thread-post-id'>No.{id}</span>
                {renderRefs(references)}
                <span className='mdi mdi-dots-vertical thread-post-options'></span>
            </div>
            {createMediaIfExists(ID, SRC, ext)}
            <blockquote dangerouslySetInnerHTML={{__html: comment}}/>
        </div>
    )
}


function renderRefs(refs) {
    return refs ? <span className='thread-post-references'>
        {refs.map( ref => 
            <span key={uuid.v4()}>
                <a 
                    className="quotelink refered" 
                    href={`#p${ref}`}
                >
                    {`>>${ref}`}
                </a>
            </span>
        )}
    </span> : ''
}

function renderTitle(title) {
    if (title) return <span className='thread-post-title'> 
        <strong dangerouslySetInnerHTML={{__html: title}}/>
    </span>
}

// function renderTimeAgo(time){
//     const post = moment(time);
//     return <Tooltip 
//                 content={post.format('dddd [at] hh:mm:ss A')}
//                 className="date"
//                 position="top"
//                 >
//         {post.fromNow()}
//     </Tooltip>
// }

