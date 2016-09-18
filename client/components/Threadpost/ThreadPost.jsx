import React from 'react';
import {
    createImage, 
    createWebm
} from './helpers'

export default function ({post, children}) {
    const { id, title, date, imgsrc, comment, ext } = post

    const SRC = imgsrc
    const ID = 'thread-media-' + id

    return (
        <div className='thread-post'>
            <div className='info'>
                {() => {if (title) return <span className='title'>{title}</span>}}
                {children}
                <span className='number'>No.{id}</span>
                <span className='backlink'></span>
            </div>
            {createMediaIfExists()}
            <blockquote dangerouslySetInnerHTML={{__html: comment}}/>
        </div>
    )

    function createMediaIfExists() {
        if (SRC) {
            if (ext === '.webm') return createWebm();
            else return createImage(ID, SRC);
        }
    }
}


