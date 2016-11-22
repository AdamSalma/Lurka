import React from 'react'
import uuid from 'uuid'
import {
    createMediaIfExists
} from './Media'
import TimeAgo from '../TimeAgo'

export default function ({post, children, controls}) {
    const { id, name, title, date, imgsrc, comment, ext, references, time } = post

    const SRC = imgsrc
    const ID = 'post-media-' + id

    return (
        <div id={"p"+id} className='thread-post clearfix'>
            <div className='thread-post-info'>
                {renderTitle(title)}
                <span className='thread-post-name'>{name}</span>
                <span className='thread-post-id'>No.{id}</span>
                <span className='pipe'/>
                <TimeAgo time={time}/>
                {renderRefs(references)}
            </div>
            {createMediaIfExists(ID, SRC, ext)}
            <blockquote dangerouslySetInnerHTML={{__html: comment}}/>
            {renderControls(controls)}
        </div>
    )
}

function renderControls(controls) {
    // TODO: Add functionality to thread icons
    // const { download, openReferences, ...} = controls 
    return (
        <ul className="thread-post-controls">
            <li onClick={()=> console.log('Clicked on download icon')}>
                <span className='mdi mdi-download'></span>
            </li>
            <li>
                <span className='mdi mdi-reply'></span>
            </li>
            <li>
                <span className='mdi mdi-comment-text'></span>
            </li>
        </ul>
    )
}

function renderRefs(refs) {
    return refs ? <span className='thread-post-references'>
        {refs.map( ref => 
            <span key={uuid.v4()}>
                <a 
                    className="quotelink" 
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
        <span className='pipe'/>
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

