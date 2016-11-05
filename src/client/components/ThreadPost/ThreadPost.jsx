import React from 'react';
import uuid from 'uuid'
import {
    createMediaIfExists
} from './Media'

export default function ({post, children}) {
    const { id, title, date, imgsrc, comment, ext, references } = post

    const SRC = imgsrc
    const ID = 'post-media-' + id

    return (
        <div id={"p"+id} className='thread-post'>
            <div className='thread-post-info'>
                {() => {if (title) return <span className='thread-post-title'>{title}</span>}}
                {children}
                <span className='thread-post-number'>No.{id}</span>
                <span className='thread-post-backlink'>{renderRefs(references)}</span>
                <span className='mdi mdi-dots-vertical thread-post-options'></span>
            </div>
            {createMediaIfExists(ID, SRC, ext)}
            <blockquote dangerouslySetInnerHTML={{__html: comment}}/>
        </div>
    )
}


function renderRefs(refs) {
    if (refs)
        return refs.map( ref => 
            <a 
                href={`#p${ref}`} 
                className="quotelink refered" 
                key={uuid.v4()}
            >{`>>${ref}`}</a>);

}